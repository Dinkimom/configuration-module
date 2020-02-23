import React, { ReactElement } from 'react'
import { Button } from 'semantic-ui-react'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { ConnectedElement } from './ConnectedElement'

export const ArrowButton = ({ name }: IBaseElementProps): ReactElement => {
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
