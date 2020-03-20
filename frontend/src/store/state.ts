import { IPanelState } from '../app/Panel/state'
import { IEditorModalState } from '../app/EditorModal/state'
import { ICodeEditorState } from '../app/CodeEditor/state'
import { IEditorsState } from '../app/Editors/state'

export interface IRootState {
  panel: IPanelState
  editorModal: IEditorModalState
  codeEditor: ICodeEditorState
  editors: IEditorsState
}
