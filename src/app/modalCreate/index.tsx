import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/state'

export const ModalCreate = (): ReactElement | null => {
  const { isOpened } = useSelector((state: IRootState) => state.modalCreate)

  if (isOpened) {
    return <p>Opened</p>
  }

  return null
}
