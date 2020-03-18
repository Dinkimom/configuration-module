import React, { ReactElement } from 'react'
import { Editor } from './Editor'
import { BrowserRouter, Route } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'

export const notificationSystem = React.createRef<any>()

export const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <NotificationSystem ref={notificationSystem} />
      <Route path='/editor/:_id?'>
        <Editor />
      </Route>
    </BrowserRouter>
  )
}
