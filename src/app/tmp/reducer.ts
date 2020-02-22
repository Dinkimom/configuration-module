import { IActionPayloaded } from '../../store/IAction';
import { IReducerPayloaded } from '../../store/IReducer';
import { TMP_DATA_LOADED } from './actions';
import { ITmpState } from './state';

const initialState: ITmpState = {
  dataDto: {
    title: 'Hello CodeSandbox',
    subTile: 'Start editing to see some magic happen!',
  },
};

export class TmpReducer implements IReducerPayloaded<ITmpState> {
  constructor() {
    this.reduce = this.reduce.bind(this);
  }

  public static Create() {
    const reducer = new TmpReducer();
    return reducer.reduce;
  }

  public reduce(
    state: ITmpState = initialState,
    action: IActionPayloaded<any>
  ): ITmpState {
    let newState = { ...state };

    switch (action.type) {
      case TMP_DATA_LOADED:
        newState.dataDto = { ...action.payload };
        break;
    }

    return newState;
  }
}
