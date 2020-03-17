import React, { ReactElement } from 'react'
import { Editor } from './Editor'
import { BrowserRouter } from 'react-router-dom'

export const App = (): ReactElement => (
  <BrowserRouter>
    <Editor />
  </BrowserRouter>
)
