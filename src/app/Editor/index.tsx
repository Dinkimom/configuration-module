import React, { ReactElement } from 'react'
import { CodeEditor } from '../CodeEditor'
import { ModalCreate } from '../ModalCreate'

export const Editor = (): ReactElement => (
  <>
    <CodeEditor />
    <ModalCreate />
  </>
)
