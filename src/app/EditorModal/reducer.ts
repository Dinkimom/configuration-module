/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { IEditorModalState } from './state'
import {
  EDITOR_MODAL_OPEN_MODAL,
  EDITOR_MODAL_CLOSE_MODAL,
  EDITOR_MODAL_FAILURE,
  EDITOR_MODAL_SET_PENDING,
  EDITOR_MODAL_CHANGE_NAME,
} from './actions'

const initialState: IEditorModalState = {
  name: '',
  isOpened: false,
  isPending: false,
  error: {
    msg: '',
    errors: [],
  },
}

export class EditorModalReducer
  implements IReducerPayloaded<IEditorModalState> {
  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  public static Create(): any {
    const reducer = new EditorModalReducer()
    return reducer.reduce
  }

  public reduce(
    state: IEditorModalState = initialState,
    action: IActionPayloaded<any>,
  ): IEditorModalState {
    let newState = { ...state }

    switch (action.type) {
      case EDITOR_MODAL_OPEN_MODAL:
        newState.isOpened = true
        newState.name = String(action.payload)
        break
      case EDITOR_MODAL_CLOSE_MODAL:
        newState = { ...initialState }
        break
      case EDITOR_MODAL_CHANGE_NAME:
        newState.name = action.payload.name
        break
      case EDITOR_MODAL_SET_PENDING:
        newState.isPending = action.payload.flag
        break
      case EDITOR_MODAL_FAILURE:
        newState.error = { ...action.payload }
        break
    }

    return newState
  }
}
