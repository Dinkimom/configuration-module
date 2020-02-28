/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { IModalCreateState } from './state'
import { MODAL_CREATE_OPEN_MODAL, MODAL_CREATE_CLOSE_MODAL } from './actions'

const initialState: IModalCreateState = {
  isOpened: false,
  data: {
    id: '',
    name: '',
    code: '',
  },
}

export class ModalCreateReducer
  implements IReducerPayloaded<IModalCreateState> {
  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  public static Create(): any {
    const reducer = new ModalCreateReducer()
    return reducer.reduce
  }

  public reduce(
    state: IModalCreateState = initialState,
    action: IActionPayloaded<any>,
  ): IModalCreateState {
    let newState = { ...state }

    switch (action.type) {
      case MODAL_CREATE_OPEN_MODAL:
        newState.isOpened = true
        break
      case MODAL_CREATE_CLOSE_MODAL:
        newState = { ...initialState }
        break
    }

    return newState
  }
}
