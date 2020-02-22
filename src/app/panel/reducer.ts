import { IActionPayloaded } from '../../store/IAction';
import { IReducerPayloaded } from '../../store/IReducer';
import { PANEL_INIT_COMPONENT } from './actions';
import { IPanelState } from './state';


const initialState: IPanelState = {};

export class PanelReducer implements IReducerPayloaded<IPanelState> {
    constructor() {
        this.reduce = this.reduce.bind(this);
    }

    public static Create() {
        const reducer = new PanelReducer();
        return reducer.reduce;
    }

    public reduce(
        state: IPanelState = initialState,
        action: IActionPayloaded<any>
    ): IPanelState {
        let newState = { ...state };

        switch (action.type) {
            case PANEL_INIT_COMPONENT:
                newState[action.payload.name] = {
                    value: '123',
                    type: action.payload.type
                };
                break;
        }

        console.log(newState)

        return newState;
    }
}