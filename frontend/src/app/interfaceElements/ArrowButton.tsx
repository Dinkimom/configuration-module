import React, { ReactElement } from 'react'
import { Button } from 'semantic-ui-react'
import { colors } from '../../shared/constants/colors'
import { sizes } from '../../shared/constants/sizes'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { IOption } from '../../shared/types/IOption'
import { IParams } from '../../shared/types/IParams'
import { ConnectedElement } from './ConnectedElement'

interface IArrowButtonProps extends IBaseElementProps {
  direction: 'left' | 'right'
}

export const ArrowButton = ({
  name,
  direction = 'left',
  common,
  color,
  size,
  optional,
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

  const initialParams: IParams = {
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
      color={color}
      size={size}
    >
      <Button
        color={
          color === 'editable'
            ? (params['Color'] || {}).value || colors[0].value
            : color
        }
        size={
          size === 'editable'
            ? (params['Size'] || {}).value || sizes[0].value
            : size
        }
        icon={`${String(
          params['Icon'].value || options[0].value,
        )} ${direction}`}
        {...other}
      />
    </ConnectedElement>
  )
}
