import { IApplicationDTO } from '../../shared/types/IApplicationDTO'

export const EDITORS_LOAD_DATA = 'EDITORS_LOAD_DATA'
export const EDITORS_DATA_LOADED = 'EDITORS_DATA_LOADED'
export const EDITORS_DELETE = 'EDITORS_DELETE'

export const editorsActions = {
  loadData: () => ({
    type: EDITORS_LOAD_DATA,
  }),

  dataLoaded: (payload: { list: IApplicationDTO[] }) => ({
    type: EDITORS_DATA_LOADED,
    payload,
  }),

  delete: (payload: { _id: string }) => ({
    type: EDITORS_DELETE,
    payload,
  }),
}
