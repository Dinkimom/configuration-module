/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import { PANEL_CLEAR, PANEL_INIT_COMPONENT, PANEL_INIT_PAGE, PANEL_SET_CURRENT_PAGE } from './actions'
import { IPanelState } from './state'


const initialState: IPanelState = {
    currentPage: null,
    pages: {},
}

export class PanelReducer implements IReducerPayloaded<IPanelState> {
    constructor() {
        this.reduce = this.reduce.bind(this)
    }

    public static Create(): any {
        const reducer = new PanelReducer()
        return reducer.reduce
    }

    public reduce(
        state: IPanelState = initialState,
        action: IActionPayloaded<any>
    ): IPanelState {
        let newState = { ...state }

        switch (action.type) {
            case PANEL_INIT_PAGE:
                newState.pages[action.payload.name] = {}
                // eslint-disable-next-line prefer-destructuring
                newState.currentPage = Object.keys(newState.pages)[0]
                break

            case PANEL_INIT_COMPONENT:
                newState.pages[action.payload.page][action.payload.name] = {
                    value: '1',
                    type: action.payload.type,
                }
                break

            case PANEL_SET_CURRENT_PAGE:
                newState.currentPage = action.payload.name
                break

            case PANEL_CLEAR:
                newState = {
                    currentPage: null,
                    pages: {},
                }
                break

        }

        return newState
    }
}
