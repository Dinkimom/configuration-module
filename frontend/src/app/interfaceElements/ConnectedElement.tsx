import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { IParams } from '../../shared/types/IParams'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'

interface IConnectedElementProps {
  name: string
  children: ReactNode
  params: IParams
  common?: boolean
  optional?: boolean
}

export const ConnectedElement = ({
  name,
  params,
  children,
  common,
  optional,
}: IConnectedElementProps): ReactElement => {
  const page = usePageContext()
  const { focusedField, isInitialized } = useSelector(
    (state: IRootState) => state.panel,
  )
  const isElementInitialized = Boolean(
    useSelector((state: IRootState) => state.panel.settings.pages[page][name]),
  )
  const dispatch = useDispatch()

  if (optional) {
    params['Is visible'] = {
      type: ConfigurationElements.optional,
    }
  }

  const initComponent = useCallback(() => {
    dispatch(panelActions.initComponent({ page, name, params, common }))
  }, [dispatch, name, page, params, common])

  useEffect(() => {
    if (!isElementInitialized || !isInitialized) {
      initComponent()
    }
  }, [initComponent, isInitialized, isElementInitialized])

  const elementParams = useFieldValue(name, params, common)

  const component = (
    <span
      className={focusedField && focusedField === name ? 'currentElement' : ''}
    >
      {children}
    </span>
  )

  if (optional) {
    return (
      (elementParams['Is visible'].value && (
        <Popup content={name} trigger={component} />
      )) ||
      null
    )
  } else {
    return <Popup content={name} trigger={component} />
  }
}
