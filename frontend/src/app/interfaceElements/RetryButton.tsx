import React, { ReactElement } from 'react'
import { Button } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { IOption } from '../../shared/types/IOption'
import { ConnectedElement } from './ConnectedElement'

export const RetryButton = ({
  name,
  common,
  optional,
  ...other
}: IBaseElementProps): ReactElement => {
  const options: IOption[] = [
    { text: 'Simple retry', value: 'undo', icon: 'undo' },
    {
      text: 'Alternate retry',
      value: 'undo alternate',
      icon: 'undo alternate',
    },
    { text: 'Circled retry', value: 'sync', icon: 'sync' },
    {
      text: 'Alternate circled retry',
      value: 'sync alternate',
      icon: 'sync alternate',
    },
  ]

  const initialParams = {
    Icon: {
      type: ConfigurationElements.select,
      options,
    },
  }

  const params = useFieldValue(name, initialParams, common)

  return (
    <ConnectedElement
      name={name}
      optional={optional}
      params={initialParams}
      common={common}
    >
      <Button icon={params['Icon'].value} size='medium' {...other} />
    </ConnectedElement>
  )
}
