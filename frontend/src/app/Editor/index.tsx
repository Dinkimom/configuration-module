import React, { ReactElement } from 'react'
import { CodeEditor } from '../CodeEditor'
import { EditorModal } from '../EditorModal'

export const Editor = (): ReactElement => (
  <>
    <CodeEditor />
    <EditorModal />
  </>
)
