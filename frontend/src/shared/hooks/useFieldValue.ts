import { useSelector } from 'react-redux'
import { IRootState } from '../../store/state'
import { usePageContext } from './usePageContext'
import { getElementObject } from '../functions/getElementObject'

export const useFieldValue = (
  name: string,
  common?: boolean,
  clear: boolean = true,
  direction?: 'left' | 'right',
): any => {
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

      if (clear) return value

      const type: any = state.panel.settings.pages[page][name].type

      return (getElementObject(type as any) as any).getValue(value, direction)
    }

    return null
  })
}
