import React, { ReactElement } from 'react'
import { ConnectedElement } from './ConnectedElement'

interface IBaseElementProps {
	name: string
	type: string
}

export const ArrowButton = ({
	name,
	type,
}: IBaseElementProps): ReactElement => (
	<ConnectedElement name={name} type={type}>
		<button>123</button>
	</ConnectedElement>
)
