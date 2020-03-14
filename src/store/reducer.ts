import { combineReducers } from 'redux'
import { ModalCreateReducer } from '../app/ModalCreate/reducer'
import { PanelReducer } from '../app/Panel/reducer'
import { IRootState } from './state'

export const rootReducer = combineReducers<IRootState>({
  panel: PanelReducer.Create(),
  modalCreate: ModalCreateReducer.Create(),
})
