import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Dropdown, Form, Popup } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'
import { useParams } from 'react-router-dom'

export type ConfigurationElement = 'arrowButton' | 'optional'

interface IConfigurationElementProps {
  name: string
  page: string
  type: ConfigurationElement
  common?: boolean
}

export const ConfigurationElement = ({
  name,
  page,
  type,
  common,
}: IConfigurationElementProps): ReactElement | null => {
  let component = null

  const { application_id, user_id } = useParams<{
    application_id: string
    user_id: string
  }>()

  const dispatch = useDispatch()
  const { value } = useSelector((state: IRootState) =>
    common
      ? state.panel.settings.common[name]
      : state.panel.settings.pages![page][name],
  )
  const { online } = useSelector((state: IRootState) => state.panel)

  const handleChange = (evt: any, data: any): void => {
    const action = {
      value: data.value || data.checked,
      name,
      page,
      common,
    }
    dispatch(panelActions.setFieldValue(action))
    if (online) {
      dispatch(
        panelActions.updateData({
          ...action,
          application_id,
          user_id,
          common,
        }),
      )
    }
  }

  const handleFocus = (): void => {
    dispatch(panelActions.setFocusedField({ name }))
  }

  const handleBlur = (): void => {
    dispatch(panelActions.setFocusedField({ name: undefined }))
  }

  switch (type) {
    case 'arrowButton':
      component = (
        <Dropdown
          onChange={handleChange}
          selection={true}
          options={[
            { text: 'Simple arrow', value: '0', icon: 'arrow left' },
            { text: 'Circle arrow', value: '1', icon: 'arrow circle left' },
            { text: 'Angle arrow', value: '2', icon: 'angle left' },
          ]}
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
      break

    case 'optional':
      component = (
        <Checkbox
          onChange={handleChange}
          checked={value}
          toggle={true}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
      break

    default:
      return null
  }

  return (
    <Form.Field>
      <label>
        {name}{' '}
        {common && (
          <Popup
            content='This interface element is shared across multiple pages.'
            trigger={
              <span style={{ opacity: '.3', marginLeft: '5px' }}>Common</span>
            }
          />
        )}
      </label>
      {component}
    </Form.Field>
  )
}
