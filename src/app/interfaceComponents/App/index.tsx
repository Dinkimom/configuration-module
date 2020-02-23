import React, { ReactElement, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { IRootState } from '../../../store/state'
import { ConfigurationBlock } from '../../configurationElements/ConfigurationBlock'
import './index.css'

interface IAppProps {
	children: ReactNode
}

export const App = ({ children }: IAppProps): ReactElement | null => {
	const isInitialized = Boolean(useSelector((state: IRootState) => state.panel))

	if (isInitialized) {
		return (
			<>
				<Header as='h1' block={true}>
					Страница конфигурации
				</Header>

				<ConfigurationBlock />
				<div className='app'>{children}</div>
			</>
		)
	}

	return null
}
