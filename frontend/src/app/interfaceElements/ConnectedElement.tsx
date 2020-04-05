import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { IParams } from '../../shared/types/IParams'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'

interface IConnectedElementProps {
  name: string
  children: ReactNode
  params: IParams
  common?: boolean
  optional?: boolean
  color?: string | 'editable'
  size?: string | 'editable'
}

export const ConnectedElement = ({
  name,
  params,
  children,
  common,
  optional,
  color,
  size,
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

  if (color === 'editable') {
    params['Color'] = {
      type: ConfigurationElements.color,
    }
  }

  if (size === 'editable') {
    params['Size'] = {
      type: ConfigurationElements.size,
    }
  }

  const elementParams = useFieldValue(name, params, common)

  const initComponent = useCallback(() => {
    dispatch(panelActions.initComponent({ page, name, params, common }))
  }, [dispatch, name, page, params, common])

  useEffect(() => {
    if (!isElementInitialized || !isInitialized) {
      initComponent()
    }
  }, [initComponent, isInitialized, isElementInitialized])

  const component =
    focusedField && focusedField === name ? (
      <span className='currentElement'>{children}</span>
    ) : (
      children
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
