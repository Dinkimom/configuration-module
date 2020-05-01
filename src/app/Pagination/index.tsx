import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination as BasicPagination } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { paginationActions } from './actions'

interface IPaginationProps {
  onLoad: (...args: any) => void
}

export const Pagination = ({ onLoad }: IPaginationProps) => {
  const { totalPages, currentPage } = useSelector(
    (state: IRootState) => state.pagination,
  )

  const dispatch = useDispatch()

  if (totalPages > 1) {
    return (
      <BasicPagination
        onPageChange={(evt, data) => {
          onLoad({ currentPage: data.activePage })
          dispatch(
            paginationActions.setCurrentPage({
              currentPage: data.activePage as number,
            }),
          )
        }}
        activePage={currentPage}
        totalPages={totalPages}
      />
    )
  }

  return null
}
