import React, { ReactElement } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { IOption } from '../../shared/types/IOption'
import { ConnectedElement } from './ConnectedElement'

interface IArrowButtonProps extends IBaseElementProps, ButtonProps {
  direction: 'left' | 'right'
}

export const ArrowButton = ({
  name,
  direction = 'left',
  common,
  ...other
}: IArrowButtonProps): ReactElement => {
  if (direction !== 'left' && direction !== 'right') {
    throw new Error('Invalid direction value')
  }

  const options: IOption[] = [
    { text: 'Simple arrow', value: 'arrow', icon: 'arrow left' },
    { text: 'Circle arrow', value: 'arrow circle', icon: 'arrow circle left' },
    { text: 'Angle arrow', value: 'angle', icon: 'angle left' },
  ]

  return (
    <ConnectedElement
      name={name}
      common={common}
      type={ConfigurationElements.select}
      options={options}
    >
      <Button icon={`${useFieldValue(name, common)} ${direction}`} {...other} />
    </ConnectedElement>
  )
}
