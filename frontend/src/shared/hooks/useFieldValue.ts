import { useSelector } from 'react-redux'
import { IRootState } from '../../store/state'
import { usePageContext } from './usePageContext'

export const useFieldValue = (name: string): any => {
	const page = usePageContext()

	return useSelector((state: IRootState) => {
		const isInitialized = Boolean(state.panel.pages[page][name])

		if (isInitialized) {
			return state.panel.pages[page][name].value
		}

		return null
	})
}
