/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { IEditorsState } from './state'
import { EDITORS_DATA_LOADED } from './actions'

const initialState: IEditorsState = {
  list: [],
  isPending: false,
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
    let newState = { ...state }

    switch (action.type) {
      case EDITORS_DATA_LOADED:
        newState.list = [...action.payload.list]
        break
    }

    return newState
  }
}
