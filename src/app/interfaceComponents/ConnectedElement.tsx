import { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { panelActions } from '../panel/actions'

interface IConnectedElementProps {
	name: string
	children: ReactNode
	type: string
}

export const ConnectedElement = ({
	name,
	type,
	children,
}: IConnectedElementProps): ReactElement => {
	const page = usePageContext()

	const dispatch = useDispatch()
	const initComponent = useCallback(() => {
		dispatch(panelActions.initComponent({ page, name, type }))
	}, [dispatch, name, page, type])

	useEffect(() => {
		initComponent()
	}, [initComponent])

	return children as any
}
