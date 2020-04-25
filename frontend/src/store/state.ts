import { ICodeEditorState } from '../app/CodeEditor/state'
import { IEditorModalState } from '../app/EditorModal/state'
import { IEditorsState } from '../app/Editors/state'
import { IHowToState } from '../app/HowTo/state'
import { IPaginationState } from '../app/Pagination/state'
import { IPanelState } from '../app/Panel/state'

export interface IRootState {
  pagination: IPaginationState
  panel: IPanelState
  editorModal: IEditorModalState
  codeEditor: ICodeEditorState
  editors: IEditorsState
  howTo: IHowToState
}
