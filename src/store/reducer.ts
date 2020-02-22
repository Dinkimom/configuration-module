import { combineReducers } from 'redux';
import { PanelReducer } from './../app/panel/reducer';
import { IRootState } from './state';

export const rootReducer = combineReducers<IRootState>({
  panel: PanelReducer.Create()
});
