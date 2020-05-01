import { useSelector } from 'react-redux'
import { IRootState } from '../../store/state'
import { usePageContext } from './usePageContext'
import { IParams } from '../types/IParams'

export const useFieldValue = (
  name: string,
  initialParams: IParams,
  common?: boolean,
): any => {
  const page = usePageContext()

  return useSelector((state: IRootState) => {
    const isInitialized = Boolean(state.panel.settings.pages[page][name])
    let params: any

    if (isInitialized) {
      if (common) {
        params = state.panel.settings.common[name].params
      } else {
        params = state.panel.settings.pages[page][name].params
      }

      return params
    }

    return initialParams
  })
}
