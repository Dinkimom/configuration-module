import React, { ReactElement } from 'react'
import { Progress } from 'semantic-ui-react'
import { colors } from '../../shared/constants/colors'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { ConnectedElement } from './ConnectedElement'
import { sizes } from '../../shared/constants/sizes'

export const ProgressBar = ({
  name,
  common,
  color,
  size,
  ...other
}: IBaseElementProps): ReactElement => {
  const params = useFieldValue(name, {}, common)

  return (
    <ConnectedElement
      name={name}
      optional={true}
      params={{}}
      common={common}
      color={color}
      size={size}
    >
      <Progress
        percent={40}
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
        {...other}
      />
    </ConnectedElement>
  )
}
