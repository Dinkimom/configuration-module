import { useSelector } from 'react-redux'
import { IRootState } from '../../store/state'
import { usePageContext } from './usePageContext'

export const useFieldValue = (name: string, common?: boolean): any => {
  const page = usePageContext()

  return useSelector((state: IRootState) => {
    const isInitialized = Boolean(state.panel.settings.pages[page][name])
    let value: any

    if (isInitialized) {
      if (common) {
        value = state.panel.settings.common[name].value
      } else {
        value = state.panel.settings.pages[page][name].value
      }

      return value
    }

    return null
  })
}
