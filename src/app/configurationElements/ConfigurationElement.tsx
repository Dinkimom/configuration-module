import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox, Input } from 'semantic-ui-react'
import { panelActions } from '../panel/actions'

export type ConfigurationElement = 'arrowButton' | 'progressBar'

interface IConfigurationElementProps {
	name: string
	page: string
	type: ConfigurationElement
}

export const ConfigurationElement = ({
	name,
	page,
	type,
}: IConfigurationElementProps): ReactElement | null => {
	const dispatch = useDispatch()

	switch (type) {
		case 'arrowButton':
			return (
				<Input
					onChange={(evt: any, data: any) => {
						dispatch(panelActions.setFieldValue({ value: data.value, name, page }))
					}}
					type='range'
					min={0}
					max={3}
					name={name}
				/>
			)

		case 'progressBar':
			return <Checkbox name={name} />

		default:
			return null
	}
}
