import { IHowToState } from './state'
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { HOW_TO_OPEN, HOW_TO_CLOSE } from './actions'

const initialState: IHowToState = {
  isOpened: false,
}

export class HowToReducer implements IReducerPayloaded<IHowToState> {
  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  public static Create(): any {
    const reducer = new HowToReducer()
    return reducer.reduce
  }

  public reduce(
    state: IHowToState = initialState,
    action: IActionPayloaded<any>,
  ): IHowToState {
    const newState = { ...state }

    switch (action.type) {
      case HOW_TO_OPEN:
        newState.isOpened = true
        break
      case HOW_TO_CLOSE:
        newState.isOpened = false
        break
    }

    return newState
  }
}
