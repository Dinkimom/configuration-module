import { combineReducers } from 'redux'
import { ModalCreateReducer } from '../app/modalCreate/reducer'
import { PanelReducer } from '../app/panel/reducer'
import { IRootState } from './state'

export const rootReducer = combineReducers<IRootState>({
  panel: PanelReducer.Create(),
  modalCreate: ModalCreateReducer.Create(),
})
