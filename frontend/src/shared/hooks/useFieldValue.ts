import { useSelector } from 'react-redux'
import { IRootState } from '../../store/state'
import { usePageContext } from './usePageContext'

export const useFieldValue = (name: string, common?: boolean): any => {
  const page = usePageContext()

  return useSelector((state: IRootState) => {
    const isInitialized = Boolean(state.panel.settings.pages[page][name])

    if (isInitialized) {
      if (common) {
        return state.panel.settings.common[name].value
      } else {
        return state.panel.settings.pages[page][name].value
      }
    }

    return null
  })
}
