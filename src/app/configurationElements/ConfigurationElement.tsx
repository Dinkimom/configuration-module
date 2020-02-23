import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Input } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { panelActions } from '../panel/actions'

export type ConfigurationElement = 'arrowButton' | 'optional'

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
	const { value } = useSelector((state: IRootState) => state.panel.pages[page][name])

	const handleChange = (evt: any, data: any): void => {
		console.log(data)
		dispatch(panelActions.setFieldValue({ value: data.value || data.checked, name, page }))
	}

	switch (type) {
		case 'arrowButton':
			return (
				<Input onChange={handleChange} type='range' value={value} min={0} max={3} name={name} />
			)

		case 'optional':
			return <Checkbox onChange={handleChange} toggle={true} name={name} />

		default:
			return null
	}
}
