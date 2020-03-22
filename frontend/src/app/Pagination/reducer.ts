/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { IPaginationState } from './state'
import { PAGINATION_INIT, PAGINATION_SET_CURRENT_PAGE } from './actions'

const initialState: IPaginationState = {
  totalPages: 0,
  currentPage: 1,
}

export class PaginationReducer implements IReducerPayloaded<IPaginationState> {
  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  public static Create(): any {
    const reducer = new PaginationReducer()
    return reducer.reduce
  }

  public reduce(
    state: IPaginationState = initialState,
    action: IActionPayloaded<any>,
  ): IPaginationState {
    let newState = { ...state }

    switch (action.type) {
      case PAGINATION_INIT:
        newState = { ...newState, ...action.payload }
        break
      case PAGINATION_SET_CURRENT_PAGE:
        newState.currentPage = action.payload.currentPage
        break
    }

    return newState
  }
}
