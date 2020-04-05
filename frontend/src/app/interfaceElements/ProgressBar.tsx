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
  const initialParams = {
    'Is visible': {
      type: ConfigurationElements.optional,
    },
  }
  const params = useFieldValue(name, initialParams, common)

  return (
    <ConnectedElement name={name} params={initialParams} common={common}>
      {params['Is visible'].value && (
        <Progress {...other} percent={40} color='green' size='small' />
      )}
    </ConnectedElement>
  )
}
