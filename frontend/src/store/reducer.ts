import { combineReducers } from 'redux'
import { EditorModalReducer } from '../app/EditorModal/reducer'
import { CodeEditorReducer } from '../app/CodeEditor/reducer'
import { PanelReducer } from '../app/Panel/reducer'
import { IRootState } from './state'

export const rootReducer = combineReducers<IRootState>({
  panel: PanelReducer.Create(),
  editorModal: EditorModalReducer.Create(),
  codeEditor: CodeEditorReducer.Create(),
})
