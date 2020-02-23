import React, { ReactElement } from 'react'
import { Progress } from 'semantic-ui-react'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { ConnectedElement } from './ConnectedElement'

export const ProgressBar = ({ name }: IBaseElementProps): ReactElement => {
	const isVisible = useFieldValue(name)
	console.log(isVisible)

	return (
		<ConnectedElement name={name} type='optional'>
			{isVisible && <Progress percent={40} color='green' size='small' indicating={true} />}
		</ConnectedElement>
	)
}
