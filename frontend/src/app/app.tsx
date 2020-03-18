import React, { ReactElement } from 'react'
import { Editor } from './Editor'
import { BrowserRouter, Route } from 'react-router-dom'

export const App = (): ReactElement => (
  <BrowserRouter>
    <Route path='/editor/:_id'>
      <Editor />
    </Route>
  </BrowserRouter>
)
