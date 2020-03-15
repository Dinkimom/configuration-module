import { IPanelState } from '../app/Panel/state'
import { IEditorModalState } from '../app/EditorModal/state'

export interface IRootState {
  panel: IPanelState
  editorModal: IEditorModalState
}
