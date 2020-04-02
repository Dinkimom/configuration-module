import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { IConfigurationElement } from '../../shared/types/IConfigurationElement'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'

interface IConnectedElementProps {
  name: string
  children: ReactNode
  type: IConfigurationElement
  common?: boolean
}

export const ConnectedElement = ({
  name,
  type,
  children,
  common,
}: IConnectedElementProps): ReactElement => {
  const page = usePageContext()
  const { focusedField, isInitialized } = useSelector(
    (state: IRootState) => state.panel,
  )
  const isElementInitialized = Boolean(
    useSelector((state: IRootState) => state.panel.settings.pages[page][name]),
  )
  const dispatch = useDispatch()
  const initComponent = useCallback(() => {
    dispatch(panelActions.initComponent({ page, name, type, common }))
  }, [dispatch, name, page, type, common])

  useEffect(() => {
    if (!isElementInitialized || !isInitialized) {
      initComponent()
    }
  }, [initComponent, isInitialized, isElementInitialized])

  if (focusedField && focusedField === name) {
    // Todo: add Popup (maybe)
    return (
      <span
        style={{
          outline: '3px solid #2185d0',
          outlineOffset: '2px',
        }}
      >
        {children}
      </span>
    )
  }

  return <Popup content={name} trigger={children} />
}
