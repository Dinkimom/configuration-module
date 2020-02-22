import { IActionPayloaded } from '../../store/IAction';
import { IReducerPayloaded } from '../../store/IReducer';
import { PANEL_CLEAR, PANEL_INIT_COMPONENT, PANEL_INIT_PAGE } from './actions';
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
        console.log(action.type)
        switch (action.type) {
            case PANEL_INIT_PAGE:
                newState[action.payload.name] = {};
                break;

            case PANEL_INIT_COMPONENT:
                newState[action.payload.page][action.payload.name] = {
                    value: '1',
                    type: action.payload.type
                };
                break;

            case PANEL_CLEAR:
                newState = {};
                break;

        }

        console.log(newState)

        return newState;
    }
}