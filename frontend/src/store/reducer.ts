import { combineReducers } from 'redux'
import { CodeEditorReducer } from '../app/CodeEditor/reducer'
import { EditorModalReducer } from '../app/EditorModal/reducer'
import { EditorsReducer } from '../app/Editors/reducer'
import { PaginationReducer } from '../app/Pagination/reducer'
import { PanelReducer } from '../app/Panel/reducer'
import { IRootState } from './state'

export const rootReducer = combineReducers<IRootState>({
  pagination: PaginationReducer.Create(),
  panel: PanelReducer.Create(),
  editorModal: EditorModalReducer.Create(),
  codeEditor: CodeEditorReducer.Create(),
  editors: EditorsReducer.Create(),
})
