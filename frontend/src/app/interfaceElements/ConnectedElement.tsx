import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
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
  const dispatch = useDispatch()

  if (typeof name !== 'string') {
    dispatch(
      panelActions.setRenderError({
        error: 'Component error: Name is required field and must be a string.',
      }),
    )
  }

  const page = usePageContext()
  const { focusedField, isInitialized } = useSelector(
    (state: IRootState) => state.panel,
  )
  const isElementInitialized = Boolean(
    useSelector((state: IRootState) => state.panel.settings.pages[page][name]),
  )

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

  const [isOpen, setOpened] = useState(false)

  const component = (
    <Popup
      className='popup-connected-element'
      content={name}
      trigger={
        focusedField && focusedField === name ? (
          <span className='currentElement'>{children}</span>
        ) : (
          children
        )
      }
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      open={focusedField !== name && isOpen}
    />
  )

  if (optional) {
    return (elementParams['Is visible'].value && component) || null
  } else {
    return component
  }
}
