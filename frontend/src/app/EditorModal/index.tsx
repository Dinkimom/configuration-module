import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { Button, Form, Modal, Message } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { editorModalActions } from './actions'

export const EditorModal = (): ReactElement => {
  const { isOpened, error } = useSelector(
    (state: IRootState) => state.editorModal,
  )
  const dispatch = useDispatch()
  const handleClose = (): Action => dispatch(editorModalActions.closeModal())

  return (
    <Modal size='tiny' open={isOpened} onClose={handleClose}>
      <Modal.Header>Create a new one CP</Modal.Header>
      <Modal.Content>
        <Form error={Boolean(error)}>
          <Form.Input name='name' label='name' required={true} fluid={true} />
          <Message error={true} header='Action Forbidden' content={error} />
          <Button type='submit' primary={true}>
            Create
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
