import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { Button, Modal } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { editorModalActions } from './actions'

export const EditorModal = (): ReactElement => {
  const { isOpened } = useSelector((state: IRootState) => state.editorModal)
  const dispatch = useDispatch()
  const handleClose = (): Action => dispatch(editorModalActions.closeModal())

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
