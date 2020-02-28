import React, { ReactElement } from 'react'
import CodeEditor from '../codeEditor'
import { ModalCreate } from '../modalCreate'

export const Panel = (): ReactElement => {
  return (
    <>
      <CodeEditor />
      <ModalCreate />
    </>
  )
}
