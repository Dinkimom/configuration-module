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
  const isPageInitialized = Boolean(
    useSelector((state: IRootState) => state.panel.pages[name]),
  )
  const { currentPage, isInitialized } = useSelector(
    (state: IRootState) => state.panel,
  )

  const initPage = useCallback(() => {
    dispatch(panelActions.initPage({ name }))
  }, [dispatch, name])

  useEffect(() => {
    if (!isPageInitialized || !isInitialized) {
      initPage()
    }
  }, [initPage, isInitialized, isPageInitialized])

  if (isPageInitialized) {
    return (
      <PageContext.Provider value={{ page: name }}>
        {currentPage === name && <div className='app__page'>{children}</div>}
      </PageContext.Provider>
    )
  }

  return null
}
