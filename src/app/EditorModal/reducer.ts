/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { IEditorModalState } from './state'
import { EDITOR_MODAL_OPEN_MODAL, EDITOR_MODAL_CLOSE_MODAL } from './actions'

const initialState: IEditorModalState = {
  isOpened: false,
  data: {
    id: '',
    name: '',
    code: '',
  },
  error: '',
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
        break
      case EDITOR_MODAL_CLOSE_MODAL:
        newState = { ...initialState }
        break
    }

    return newState
  }
}
