/* eslint-disable @typescript-eslint/unbound-method */
import { IActionPayloaded } from '../../store/IAction'
import { IReducerPayloaded } from '../../store/IReducer'
import {
	PANEL_CLEAR,
	PANEL_INIT_COMPONENT,
	PANEL_INIT_PAGE,
	PANEL_SET_CURRENT_PAGE,
	PANEL_SET_FIELD_VALUE,
} from './actions'
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

	public reduce(state: IPanelState = initialState, action: IActionPayloaded<any>): IPanelState {
		let newState = { ...state }

		switch (action.type) {
			case PANEL_INIT_PAGE:
				if (!newState.pages[action.payload.name]) {
					newState.pages[action.payload.name] = {}
					// eslint-disable-next-line prefer-destructuring
					newState.currentPage = Object.keys(newState.pages)[0]
				}
				break

			case PANEL_INIT_COMPONENT:
				if (!newState.pages[action.payload.page][action.payload.name]) {
					newState.pages[action.payload.page][action.payload.name] = {
						value: '0',
						type: action.payload.type,
					}
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

			case PANEL_SET_FIELD_VALUE:
				console.log(action)
				newState.pages[action.payload.page][action.payload.name].value = action.payload.value
				break
		}

		return newState
	}
}
