import { IPanelState } from '../app/Panel/state'
import { IModalCreateState } from '../app/ModalCreate/state'

export interface IRootState {
  panel: IPanelState
  modalCreate: IModalCreateState
}
