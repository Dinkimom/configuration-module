import React, { ReactElement } from 'react'
import { Button } from 'semantic-ui-react'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { ConnectedElement } from './ConnectedElement'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'

export const RetryButton = ({
  name,
  common,
  ...other
}: IBaseElementProps): ReactElement => {
  return (
    <ConnectedElement name={name} common={common} type={'retryButton'}>
      <Button
        icon={useFieldValue(name, common, false)}
        size='medium'
        {...other}
      />
    </ConnectedElement>
  )
}
