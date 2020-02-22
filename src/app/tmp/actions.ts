import { ITmpDto } from '../../shared/types/tmp_dto';
import { IActionCreator } from '../../store/IAction';

export const TMP_LOAD_DATA = 'TMP_LOAD_DATA';
export const TMP_DATA_LOADED = 'TMP_DATA_LOADED';

export const tmpActions: IActionCreator = {
  loadData: () => ({ type: TMP_LOAD_DATA }),
  dataLoaded: (dto: ITmpDto) => ({
    type: TMP_DATA_LOADED,
    payload: dto,
  }),
};
