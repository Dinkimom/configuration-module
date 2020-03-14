import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'

interface IPageProps {
  name: string
  children: ReactNode
}

export const PageContext = React.createContext({ page: '' })

export const Page = ({ name, children }: IPageProps): ReactElement | null => {
  const dispatch = useDispatch()
  const isInitialized = Boolean(
    useSelector((state: IRootState) => state.panel.pages[name]),
  )
  const { currentPage } = useSelector((state: IRootState) => state.panel)

  const initPage = useCallback(() => {
    dispatch(panelActions.initPage({ name }))
  }, [dispatch, name])

  useEffect(() => {
    if (!isInitialized) {
      initPage()
    }
  }, [initPage, isInitialized])

  if (isInitialized) {
    return (
      <PageContext.Provider value={{ page: name }}>
        {currentPage === name && <div className='app__page'>{children}</div>}
      </PageContext.Provider>
    )
  }

  return null
}
