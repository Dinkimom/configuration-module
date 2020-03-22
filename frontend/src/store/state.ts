import { ICodeEditorState } from '../app/CodeEditor/state'
import { IEditorModalState } from '../app/EditorModal/state'
import { IEditorsState } from '../app/Editors/state'
import { IPanelState } from '../app/Panel/state'
import { IPaginationState } from '../app/Pagination/state'

export interface IRootState {
  pagination: IPaginationState
  panel: IPanelState
  editorModal: IEditorModalState
  codeEditor: ICodeEditorState
  editors: IEditorsState
}
