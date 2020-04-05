import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Checkbox, Dropdown, Form } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'
import { colors } from '../../shared/constants/colors'

interface IConfigurationElementProps {
  name: string
  page: string
  type: ConfigurationElements
  param: string
  common?: boolean
}

export const ConfigurationElement = ({
  name,
  page,
  param,
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
      ? state.panel.settings.common[name].params[param]
      : state.panel.settings.pages![page][name].params[param],
  )
  const { options } = useSelector(
    (state: IRootState) =>
      state.panel.settings.pages![page][name].params[param],
  )
  const { online } = useSelector((state: IRootState) => state.panel)

  const handleChange = (evt: any, data: any): void => {
    const action = {
      value: data.value || data.checked,
      name,
      page,
      param,
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
    case ConfigurationElements.color:
      component = (
        <Dropdown
          onChange={handleChange}
          selection={true}
          options={colors}
          name={param}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
      break

    case ConfigurationElements.select:
      component = (
        <Dropdown
          onChange={handleChange}
          selection={true}
          options={options}
          name={param}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
      break

    case ConfigurationElements.optional:
      component = (
        <Checkbox
          onChange={handleChange}
          checked={value}
          toggle={true}
          name={param}
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
      <label>{param}</label>
      {component}
    </Form.Field>
  )
}
