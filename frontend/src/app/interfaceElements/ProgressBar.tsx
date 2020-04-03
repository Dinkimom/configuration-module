import React, { ReactElement } from 'react'
import { Progress } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { ConnectedElement } from './ConnectedElement'

export const ProgressBar = ({
  name,
  common,
  ...other
}: IBaseElementProps): ReactElement => {
  const isVisible = useFieldValue(name, common)

  return (
    <ConnectedElement
      name={name}
      common={common}
      type={ConfigurationElements.optional}
    >
      {isVisible && (
        <Progress {...other} percent={40} color='green' size='small' />
      )}
    </ConnectedElement>
  )
}
