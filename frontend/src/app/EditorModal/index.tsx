import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { Button, Form, Message, Modal } from 'semantic-ui-react'
import { EditorModes } from '../../shared/enums/EditorModes'
import { useEditorModes } from '../../shared/hooks/useEditorModes'
import { IRootState } from '../../store/state'
import { editorModalActions } from './actions'

export const EditorModal = (): ReactElement => {
  const { _id, mode } = useEditorModes()

  const { isOpened, isPending, error, name } = useSelector(
    (state: IRootState) => state.editorModal,
  )
  const { toRender: descriptionCode } = useSelector(
    (state: IRootState) => state.codeEditor,
  )

  const dispatch = useDispatch()

  const handleClose = (): Action => dispatch(editorModalActions.closeModal())

  const handleChange = (evt: any, data: any) =>
    dispatch(editorModalActions.changeName({ name: data.value }))
  const handleSubmit = () => {
    if (mode === EditorModes.create) {
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
        {mode === EditorModes.create
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
            label='Name'
            value={name}
            required={true}
            fluid={true}
            onChange={handleChange}
          />
          <Message error={true} header='Action Forbidden' content={error.msg} />
          <Button type='submit' primary={true}>
            {mode === EditorModes.create ? 'Create' : 'Update'}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
