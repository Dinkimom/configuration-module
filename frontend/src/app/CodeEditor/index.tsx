import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import { Resizable } from 're-resizable'
import React, { ReactElement } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useDispatch, useSelector } from 'react-redux'
import 'react-resizable/css/styles.css'
import { Action } from 'redux'
import { Button, Icon } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { CodeRender } from '../CodeRender'
import { editorModalActions } from '../EditorModal/actions'
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

export const CodeEditor = (): ReactElement => {
  const { code, toRender, height, error } = useSelector(
    (state: IRootState) => state.codeEditor,
  )

  const dispatch = useDispatch()

  const handleOpenModal = (): Action => dispatch(editorModalActions.openModal())
  const handleMinimizeWindow = (): Action =>
    dispatch(codeEditorActions.changeHeight({ height: minHeight }))
  const handleExpandWindow = (): Action =>
    dispatch(codeEditorActions.changeHeight({ height: '100vh' }))
  const handleCodeChange = (editor: any, data: any, value: string): Action =>
    dispatch(
      codeEditorActions.changeCode({
        code: value,
      }),
    )

  return (
    <div className='code-editor-container'>
      <div className='code-editor-container__code-render'>
        <CodeRender code={toRender} />
      </div>
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
        maxHeight={window.window.innerHeight}
      >
        <p className='code-editor__tittle'>
          Configuration Panel IDE
          <Icon name='code' />
        </p>
        <CodeMirror
          value={code}
          options={options}
          onChange={handleCodeChange}
          onBeforeChange={handleCodeChange}
        />

        <Button.Group size='mini' className='code-editor__window-buttons'>
          <Button icon='question' inverted={true} />
          <Button icon='expand' onClick={handleExpandWindow} inverted={true} />
          <Button
            icon='window minimize'
            onClick={handleMinimizeWindow}
            inverted={true}
          />
        </Button.Group>

        <Button.Group className='code-editor__control-buttons'>
          <Button
            inverted={true}
            icon='play'
            content='Generate'
            labelPosition='left'
            onClick={() => {
              dispatch(panelActions.clear())
              dispatch(codeEditorActions.changeToRender({ toRender: code }))
            }}
            disabled={!code || code === toRender}
          />
          <Button
            inverted={true}
            icon='add'
            content='Create'
            labelPosition='left'
            disabled={!toRender || error}
            onClick={handleOpenModal}
          />
        </Button.Group>
      </Resizable>
    </div>
  )
}
