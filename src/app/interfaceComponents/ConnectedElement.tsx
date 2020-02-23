import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { IRootState } from '../../store/state'
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
	const value = useSelector(
		(state: IRootState) => state.panel.pages[page][name] || null
	)

	const dispatch = useDispatch()
	const initComponent = useCallback(() => {
		dispatch(panelActions.initComponent({ page, name, type }))
	}, [dispatch, name, page, type])

	useEffect(() => {
		initComponent()
	}, [initComponent])

	return React.cloneElement(children as any, { page, name, value })
}
