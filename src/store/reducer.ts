import { combineReducers } from 'redux';
import { TmpReducer } from '../app/tmp/reducer';
import { IRootState } from './state';

export const rootReducer = combineReducers<IRootState>({
  tmp: TmpReducer.Create(),
});
