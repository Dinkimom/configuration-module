import React, { ReactElement } from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
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

  return (
    <ConnectedElement name={name} common={common} type={'arrowButton'}>
      <Button icon={useFieldValue(name, common, false, direction)} {...other} />
    </ConnectedElement>
  )
}
