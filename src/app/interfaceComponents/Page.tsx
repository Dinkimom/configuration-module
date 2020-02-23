import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../store/state'
import { panelActions } from '../panel/actions'

interface IPageProps {
    name: string
    children: ReactNode
}

export const Page = ({ name, children }: IPageProps): ReactElement | null => {
    const dispatch = useDispatch()
    const isInitialized = Boolean(useSelector((state: IRootState) => state.panel[name]))

    const initPage = useCallback(
        () => {
            dispatch(panelActions.initPage({ name }))
        },
        [dispatch, name],
    )

    useEffect(() => {
        if (!isInitialized) {
            initPage()
        }
    }, [initPage, isInitialized])

    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child as any, { page: name })
    )

    if (isInitialized) {
        return <div className='app__page'>{childrenWithProps}</div>
    }

    return null


}
