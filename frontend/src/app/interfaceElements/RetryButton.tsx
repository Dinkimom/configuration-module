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
      value: '3',
      icon: 'sync alternate',
    },
  ]

  return (
    <ConnectedElement
      name={name}
      common={common}
      type={ConfigurationElements.select}
      options={options}
    >
      <Button icon={useFieldValue(name, common)} size='medium' {...other} />
    </ConnectedElement>
  )
}
