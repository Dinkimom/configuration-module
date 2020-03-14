import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import { Resizable } from 're-resizable'
import React, { ReactElement, useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { useDispatch } from 'react-redux'
import 'react-resizable/css/styles.css'
import { Action } from 'redux'
import { Button } from 'semantic-ui-react'
import { codeExample } from '../../shared/constants/codeExample'
import { CodeRender } from '../CodeRender'
import { modalCreateActions } from '../ModalCreate/actions'
import { panelActions } from '../Panel/actions'
import './index.css'
require('codemirror/mode/jsx/jsx')

const minHeight = 45
const options = {
  mode: 'jsx',
  theme: 'material-darker',
  lineNumbers: true,
}

export const CodeEditor = (): ReactElement => {
  const [code, changeCode] = useState(codeExample)
  const [toRender, changeToRender] = useState('')
  const [height, changeHeight] = useState<string | number>('40vh')

  const dispatch = useDispatch()

  const handleOpenModal = (): Action => dispatch(modalCreateActions.openModal())
  const handleMinimizeWindow = (): void => changeHeight(minHeight)
  const handleExpandWindow = (): void => changeHeight(window.window.innerHeight)

  return (
    <div className='code-editor-container'>
      <div className='code-editor-container__code-render'>
        <CodeRender code={toRender} />
      </div>
      <Resizable
        className='code-editor-container__code-editor'
        defaultSize={{
          width: '100%',
          height: '40vh',
        }}
        size={{ width: '100%', height }}
        onResizeStop={(e, direction, ref, d) =>
          changeHeight(Number(height) + d.height)
        }
        minHeight={minHeight}
        minWidth='100%'
        maxHeight={window.window.innerHeight}
      >
        <CodeMirror
          value={code}
          options={options}
          onChange={(editor, data, value) => changeCode(value)}
          onBeforeChange={(editor, data, value) => changeCode(value)}
        />
        <Button.Group size='mini' className='code-editor__window-buttons'>
          <Button
            icon='expand'
            onClick={handleExpandWindow}
            disabled={height === window.window.innerHeight}
            inverted={true}
          />
          <Button
            icon='window minimize'
            onClick={handleMinimizeWindow}
            disabled={height === minHeight}
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
              changeToRender(code)
            }}
            disabled={!code || code === toRender}
          />
          <Button
            inverted={true}
            icon='add'
            content='Create'
            labelPosition='left'
            disabled={!toRender}
            onClick={handleOpenModal}
          />
        </Button.Group>
      </Resizable>
    </div>
  )
}
