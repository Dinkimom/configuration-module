import { delay, put, select, takeEvery } from 'redux-saga/effects';
import { safeSagaExecute } from '../../middleware/saga';
import { ITmpDto } from '../../shared/types/tmp_dto';
import { IAction } from '../../store/IAction';
import { IRootState } from '../../store/state';
import { tmpActions, TMP_LOAD_DATA } from './actions';

export class TmpApiSaga {
  public constructor() {
    this.loadData = this.loadData.bind(this);
  }

  public static Initialize() {
    const saga = new TmpApiSaga();
    return saga.watch();
  }

  public *watch() {
    yield takeEvery(TMP_LOAD_DATA, a => safeSagaExecute(a, this.loadData));
  }

  private *loadData(action: IAction) {
    yield delay(1000);

    const { tmp }: IRootState = yield select();

    const dto: ITmpDto = {
      title: tmp.dataDto.title
        .split('')
        .reverse()
        .join(''),
      subTile: tmp.dataDto.subTile
        .split('')
        .reverse()
        .join(''),
    };

    yield put(tmpActions.dataLoaded(dto));
  }
}
