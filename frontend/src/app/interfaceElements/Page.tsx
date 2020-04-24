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

  if (typeof name !== 'string') {
    dispatch(
      panelActions.setRenderError({
        error:
          'Page component error: Name is required field and must be a string.',
      }),
    )
  }

  if (typeof children === 'undefined') {
    dispatch(
      panelActions.setRenderError({
        error: `Page component error: Page "${name}" is empty.`,
      }),
    )
  }

  const isPageInitialized = Boolean(
    useSelector((state: IRootState) => state.panel.settings.pages[name]),
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
        {
          <div className={`app__page ${currentPage !== name && 'none'}`}>
            {children}
          </div>
        }
      </PageContext.Provider>
    )
  }

  return null
}
