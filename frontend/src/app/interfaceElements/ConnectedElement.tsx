import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'

interface IConnectedElementProps {
  name: string
  children: ReactNode
  type: string
}

export const ConnectedElement = ({
  name,
  type,
  children,
}: IConnectedElementProps): ReactElement => {
  const page = usePageContext()
  const { focusedField, isInitialized } = useSelector(
    (state: IRootState) => state.panel,
  )
  const isElementInitialized = Boolean(
    useSelector((state: IRootState) => state.panel.pages[page][name]),
  )
  const dispatch = useDispatch()
  const initComponent = useCallback(() => {
    dispatch(panelActions.initComponent({ page, name, type }))
  }, [dispatch, name, page, type])

  useEffect(() => {
    if (!isElementInitialized || !isInitialized) {
      initComponent()
    }
  }, [initComponent, isInitialized, isElementInitialized])

  if (focusedField && focusedField === name) {
    // Todo: add Popup (maybe)
    return <span style={{ outline: '3px solid #96c8da' }}>{children}</span>
  }

  return <Popup content={name} trigger={children} />
}
