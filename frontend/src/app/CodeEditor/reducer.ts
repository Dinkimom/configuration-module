import { codeExample } from '../../shared/constants/codeExample'
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import {
  CODE_EDITOR_CHANGE_CODE,
  CODE_EDITOR_CHANGE_HEIGHT,
  CODE_EDITOR_CHANGE_TO_RENDER,
  CODE_EDITOR_CLEAR,
  CODE_EDITOR_DATA_LOADED,
  CODE_EDITOR_SET_FAILURE,
  CODE_EDITOR_SET_PENDING,
} from './actions'
import { ICodeEditorState } from './state'

const initialState: ICodeEditorState = {
  name: '',
  code: codeExample,
  toRender: '',
  height: '60vh',
  isPending: false,
  failure: {
    msg: '',
  },
}

export class CodeEditorReducer implements IReducerPayloaded<ICodeEditorState> {
  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  public static Create(): any {
    const reducer = new CodeEditorReducer()
    return reducer.reduce
  }

  public reduce(
    state: ICodeEditorState = initialState,
    action: IActionPayloaded<any>,
  ): ICodeEditorState {
    let newState = { ...state }

    switch (action.type) {
      case CODE_EDITOR_CHANGE_CODE:
        newState.code = action.payload.code
        break
      case CODE_EDITOR_CHANGE_TO_RENDER:
        newState.toRender = action.payload.toRender
        break
      case CODE_EDITOR_CHANGE_HEIGHT:
        newState.height = action.payload.height
        break
      case CODE_EDITOR_SET_PENDING:
        newState.isPending = action.payload.flag
        break
      case CODE_EDITOR_DATA_LOADED:
        newState.name = action.payload.name
        newState.code = action.payload.descriptionCode
        newState.toRender = action.payload.descriptionCode
        break
      case CODE_EDITOR_SET_FAILURE:
        newState.failure = { ...action.payload }
        break
      case CODE_EDITOR_CLEAR:
        newState = { ...initialState }
        break
    }

    return newState
  }
}
