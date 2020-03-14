import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { Button, Modal } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { modalCreateActions } from './actions'

export const ModalCreate = (): ReactElement => {
  const { isOpened } = useSelector((state: IRootState) => state.modalCreate)
  const dispatch = useDispatch()
  const handleClose = (): Action => dispatch(modalCreateActions.closeModal())

  return (
    <Modal open={isOpened} onClose={handleClose}>
      <Modal.Content></Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={handleClose}>
          No, I won't
        </Button>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Yes, I want'
          onClick={handleClose}
        />
      </Modal.Actions>
    </Modal>
  )
}
