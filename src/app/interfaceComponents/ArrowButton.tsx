import React, { ReactElement } from 'react'
import { Button } from 'semantic-ui-react'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { ConnectedElement } from './ConnectedElement'

interface IBaseElementProps {
	name: string
	type: string
}

export const ArrowButton = ({ name }: IBaseElementProps): ReactElement => {
	console.log(useFieldValue(name))
	let icon = ''

	switch (useFieldValue(name)) {
		case '0':
			icon = 'mail'
			break
		case '1':
			icon = 'user'
			break
		case '2':
			icon = 'key'
			break
	}

	return (
		<ConnectedElement name={name} type={'arrowButton'}>
			<Button icon={icon} />
		</ConnectedElement>
	)
}
