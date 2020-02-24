import React, { ReactElement } from 'react'
import { Button } from 'semantic-ui-react'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { ConnectedElement } from './ConnectedElement'

interface IArrowButtonProps extends IBaseElementProps {
	direction: 'left' | 'right'
}

export const ArrowButton = ({ name, direction = 'left' }: IArrowButtonProps): ReactElement => {
	let icon = ''

	switch (useFieldValue(name)) {
		case '0':
			icon = `arrow ${direction}`
			break
		case '1':
			icon = `arrow circle ${direction}`
			break
		case '2':
			icon = `long arrow alternate ${direction}`
			break
	}

	return (
		<ConnectedElement name={name} type={'arrowButton'}>
			<Button icon={icon} />
		</ConnectedElement>
	)
}
