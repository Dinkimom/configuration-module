import React, { ReactElement, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { panelActions } from '../panel/actions'

interface IArrowButtonProps {
    name: string
    page: string
}

export const ArrowButton = ({ name, page }: IArrowButtonProps): ReactElement => {
    const dispatch = useDispatch()
    const initComponent = useCallback(
        () => {
            dispatch(panelActions.initComponent({ page, name, type: 'arrowButton' }))
        },
        [dispatch, name, page],
    )

    useEffect(() => {
        initComponent()
    }, [initComponent])


    return <button>123</button>
}
