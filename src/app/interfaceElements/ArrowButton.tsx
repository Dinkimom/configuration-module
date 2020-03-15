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
  ...other
}: IArrowButtonProps): ReactElement => {
  if (direction !== 'left' && direction !== 'right') {
    throw new Error('Invalid direction value')
  }

  let icon = ''

  switch (useFieldValue(name)) {
    case '0':
      icon = `arrow ${direction}`
      break
    case '1':
      icon = `arrow circle ${direction}`
      break
    case '2':
      icon = `angle ${direction}`
      break
  }

  return (
    <ConnectedElement name={name} type={'arrowButton'}>
      <Button icon={icon} size='medium' {...other} />
    </ConnectedElement>
  )
}
