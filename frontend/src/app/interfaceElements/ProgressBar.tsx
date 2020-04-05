import React, { ReactElement } from 'react'
import { Progress } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { ConnectedElement } from './ConnectedElement'
import { colors } from '../../shared/constants/colors'

export const ProgressBar = ({
  name,
  common,
  color,
  ...other
}: IBaseElementProps): ReactElement => {
  const params = useFieldValue(name, {}, common)

  return (
    <ConnectedElement
      name={name}
      params={{}}
      optional={true}
      color={color}
      common={common}
    >
      <Progress
        {...other}
        percent={40}
        color={
          color === 'editable'
            ? (params['Color'] || {}).value || colors[0].value
            : color
        }
        size='small'
      />
    </ConnectedElement>
  )
}
