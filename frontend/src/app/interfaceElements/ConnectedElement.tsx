import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { IOption } from '../../shared/types/IOption'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'

interface IConnectedElementProps {
  name: string
  children: ReactNode
  type: ConfigurationElements
  common?: boolean
  options?: IOption[]
}

export const ConnectedElement = ({
  name,
  type,
  children,
  common,
  options,
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
    dispatch(panelActions.initComponent({ page, name, type, common, options }))
  }, [dispatch, name, page, type, common, options])

  useEffect(() => {
    if (!isElementInitialized || !isInitialized) {
      initComponent()
    }
  }, [initComponent, isInitialized, isElementInitialized])

  if (focusedField && focusedField === name) {
    // Todo: add Popup (maybe)
    return <span className='currentElement'>{children}</span>
  }

  return <Popup content={name} trigger={children} />
}
