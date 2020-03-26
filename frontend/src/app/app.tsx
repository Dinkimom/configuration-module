import React, { ReactElement } from 'react'
import NotificationSystem from 'react-notification-system'
import { BrowserRouter, Route } from 'react-router-dom'
import { Editor } from './Editor'
import { Editors } from './Editors'
import { Panel } from './Panel'

export const notificationSystem = React.createRef<any>()

export const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <NotificationSystem ref={notificationSystem} />
      <Route path='/editor/:_id?'>
        <Editor />
      </Route>
      <Route path='/editors'>
        <Editors />
      </Route>
      <Route path='/panel/:application_id/:user_id'>
        <Panel online={true} />
      </Route>
    </BrowserRouter>
  )
}
