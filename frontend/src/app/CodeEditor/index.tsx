import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import { Resizable } from 're-resizable'
import React, { ReactElement, useEffect } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useDispatch, useSelector } from 'react-redux'
import 'react-resizable/css/styles.css'
import { Link } from 'react-router-dom'
import { Action } from 'redux'
import { Button, Icon, Message, Segment } from 'semantic-ui-react'
import { Loader } from '../../shared/components/Loader'
import { EditorModes } from '../../shared/enums/EditorModes'
import { formatCode } from '../../shared/functions/formatCode'
import { useEditorModes } from '../../shared/hooks/useEditorModes'
import { IRootState } from '../../store/state'
import { editorModalActions } from '../EditorModal/actions'
import { Panel } from '../Panel'
import { panelActions } from '../Panel/actions'
import { codeEditorActions } from './actions'
import './index.css'

require('codemirror/mode/jsx/jsx')
require('codemirror/addon/lint/lint')

const minHeight = 45
const options = {
  mode: 'jsx',
  theme: 'material-darker',
  gutters: ['CodeMirror-lint-markers'],
  styleActiveLine: true,
  lineNumbers: true,
  smartIndent: true,
  line: true,
  lint: true,
}

export const CodeEditor = React.memo(
  (): ReactElement => {
    const { _id, mode } = useEditorModes()

    const { code, height, isPending, name, error } = useSelector(
      (state: IRootState) => state.codeEditor,
    )
    const renderError = Boolean(
      useSelector((state: IRootState) => state.panel.renderError),
    )
    const { descriptionCode, isPending: isGenerating } = useSelector(
      (state: IRootState) => state.panel,
    )

    const dispatch = useDispatch()

    useEffect(() => {
      if (mode === EditorModes.edit) {
        dispatch(codeEditorActions.loadData({ _id: _id as string }))
      }
    }, [_id, mode, dispatch])

    const handleOpenModal = (): Action =>
      dispatch(editorModalActions.openModal(name))

    const handleMinimizeWindow = (): Action =>
      dispatch(codeEditorActions.changeHeight({ height: minHeight }))

    const handleExpandWindow = (): Action =>
      dispatch(codeEditorActions.changeHeight({ height: '100vh' }))

    const handleCodeChange = (editor: any, data: any, value: string): any => {
      console.log(data)
      dispatch(
        codeEditorActions.changeCode({
          code: value,
        }),
      )
    }

    const handleCodeFormat = () => {
      dispatch(
        codeEditorActions.changeCode({
          code: formatCode(code),
        }),
      )
    }

    if (isPending) {
      return <Loader text='Loading Editor...' />
    }

    if (error !== '') {
      return (
        <Segment padded={true} basic={true}>
          <Message size='big' negative={true}>
            <Message.Header>{error}</Message.Header>
          </Message>
        </Segment>
      )
    }

    return (
      <div className='code-editor-container'>
        <Segment basic={true} className='code-editor-container__code-render'>
          {(!isGenerating && <Panel />) || <Loader text='Generating CP...' />}
        </Segment>
        <Resizable
          className='code-editor-container__code-editor'
          size={{ width: '100%', height }}
          onResizeStop={(e, direction, ref, d) =>
            dispatch(
              codeEditorActions.changeHeight({
                height: Number(height) + d.height,
              }),
            )
          }
          minHeight={minHeight}
          minWidth='100%'
          maxHeight={'100vh'}
        >
          <span className='code-editor__tittle'>
            <p className='logo'>
              <Icon name='setting' />
              Panel
            </p>
            <p>IDE</p>
            <b>{name}</b>
          </span>

          <CodeMirror
            value={code}
            options={options}
            onBeforeChange={handleCodeChange}
          />

          <Button.Group className='code-editor__window-buttons'>
            <Button icon='question' />
            <Button
              icon='window maximize outline'
              onClick={handleExpandWindow}
            />
            <Button
              icon='window minimize outline'
              onClick={handleMinimizeWindow}
            />
          </Button.Group>

          <Button.Group className='code-editor__control-buttons'>
            <Link to='/editors'>
              <Button
                icon='chevron left'
                content='Back to editors'
                onClick={() => {
                  dispatch(panelActions.clear())
                  dispatch(codeEditorActions.clear())
                }}
              />
            </Link>
            <Button
              icon='play'
              loading={isGenerating}
              onClick={() => {
                dispatch(panelActions.clear())
                dispatch(
                  codeEditorActions.changeCode({ code: formatCode(code) }),
                )
                dispatch(
                  panelActions.init({ descriptionCode: formatCode(code) }),
                )
              }}
              disabled={!code || code === descriptionCode || isGenerating}
            />
            <Button
              icon={mode === EditorModes.create ? 'add' : 'save'}
              disabled={
                !descriptionCode ||
                renderError ||
                code !== descriptionCode ||
                isGenerating
              }
              onClick={handleOpenModal}
            />
            <Button
              icon='code'
              content='Format code'
              onClick={handleCodeFormat}
              disabled={isGenerating}
            />
          </Button.Group>
        </Resizable>
      </div>
    )
  },
)
