import { all } from 'redux-saga/effects';
import { TmpApiSaga } from '../app/tmp/saga';

export const rootSaga = function* root() {
  yield all([TmpApiSaga.Initialize()]);
};

export function* safeSagaExecute(action: any, func: (a: any) => any) {
  try {
    yield func(action);
  } catch (error) {
    console.error(error);
  }
}
