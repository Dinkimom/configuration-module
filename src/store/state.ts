import { IPanelState } from '../app/panel/state'
import { IModalCreateState } from '../app/modalCreate/state'

export interface IRootState {
  panel: IPanelState
  modalCreate: IModalCreateState
}
