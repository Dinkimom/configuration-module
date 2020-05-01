import { IPaginationState } from './state'

export const PAGINATION_INIT = 'PAGINATION_INIT'
export const PAGINATION_SET_CURRENT_PAGE = 'PAGINATION_SET_CURRENT_PAGE'

export const paginationActions = {
  init: (payload: Partial<IPaginationState>) => ({
    type: PAGINATION_INIT,
    payload,
  }),

  setCurrentPage: (payload: { currentPage: number }) => ({
    type: PAGINATION_SET_CURRENT_PAGE,
    payload,
  }),
}
