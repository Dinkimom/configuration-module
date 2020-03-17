import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { Button, Form, Modal, Message } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { editorModalActions } from './actions'
import { useParams } from 'react-router-dom'

enum EditorModalModes {
  edit,
  create,
}

export const EditorModal = (): ReactElement => {
  const { _id } = useParams()
  let mode: EditorModalModes

  if (_id === undefined) {
    mode = EditorModalModes.create
  } else {
    mode = EditorModalModes.edit
  }

  const { isOpened, isPending, error } = useSelector(
    (state: IRootState) => state.editorModal,
  )
  const { toRender: descriptionCode } = useSelector(
    (state: IRootState) => state.codeEditor,
  )
  const [name, changeName] = useState('')

  const dispatch = useDispatch()

  const handleClose = (): Action => dispatch(editorModalActions.closeModal())

  const handleChange = (evt: any, data: any) => changeName(data.value)
  const handleSubmit = () => {
    if (mode === EditorModalModes.create) {
      dispatch(
        editorModalActions.add({
          name,
          descriptionCode,
        }),
      )
    } else {
      dispatch(
        editorModalActions.update({
          _id,
          name,
          descriptionCode,
        }),
      )
    }
  }

  return (
    <Modal size='tiny' open={isOpened} onClose={handleClose}>
      <Modal.Header>
        {mode === EditorModalModes.create
          ? 'Create a new one CP'
          : 'Update created CP'}
      </Modal.Header>
      <Modal.Content>
        <Form
          error={Boolean(error.msg)}
          loading={isPending}
          onSubmit={handleSubmit}
        >
          <Form.Input
            name='name'
            label='name'
            required={true}
            fluid={true}
            onChange={handleChange}
          />
          <Message error={true} header='Action Forbidden' content={error.msg} />
          <Button type='submit' primary={true}>
            {mode === EditorModalModes.create ? 'Create' : 'Update'}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
