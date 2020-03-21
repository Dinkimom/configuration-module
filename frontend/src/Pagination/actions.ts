export const PAGINATION_INIT = 'PAGINATION_INIT'
export const PAGINATION_SET_CURRENT_PAGE = 'PAGINATION_SET_CURRENT_PAGE'

export const paginationActions = {
  init: () => ({
    type: PAGINATION_INIT,
  }),

  setCurrentPage: (payload: { currentPage: number }) => ({
    type: PAGINATION_SET_CURRENT_PAGE,
    payload,
  }),
}
