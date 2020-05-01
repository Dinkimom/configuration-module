import React, { ReactElement } from 'react'
import { CodeEditor } from '../CodeEditor'
import { EditorModal } from '../EditorModal'
import { HowTo } from '../HowTo'

export const Editor = (): ReactElement => (
  <>
    <CodeEditor />
    <EditorModal />
    <HowTo />
  </>
)
