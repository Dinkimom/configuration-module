/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../store/IAction'
import { IReducerPayloaded } from '../store/IReducer'
import { IPaginationState } from './state'

const initialState: IPaginationState = {
  totalPages: 0,
  currentPage: 0,
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
    }

    return newState
  }
}
