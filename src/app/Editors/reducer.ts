/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { IEditorsState } from './state'
import {
  EDITORS_DATA_LOADED,
  EDITORS_SET_PENDING,
  EDITORS_FAILURE,
} from './actions'

const initialState: IEditorsState = {
  list: [],
  isPending: true,
  error: '',
}

export class EditorsReducer implements IReducerPayloaded<IEditorsState> {
  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  public static Create(): any {
    const reducer = new EditorsReducer()
    return reducer.reduce
  }

  public reduce(
    state: IEditorsState = initialState,
    action: IActionPayloaded<any>,
  ): IEditorsState {
    const newState = { ...state }

    switch (action.type) {
      case EDITORS_DATA_LOADED:
        newState.list = [...action.payload.list]
        newState.error = ''
        break
      case EDITORS_SET_PENDING:
        newState.isPending = action.payload.flag
        break
      case EDITORS_FAILURE:
        newState.error = action.payload.error
        break
    }

    return newState
  }
}
