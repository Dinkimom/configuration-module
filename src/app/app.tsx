import React, { ReactElement } from 'react'
import NotificationSystem from 'react-notification-system'
import { BrowserRouter, Route } from 'react-router-dom'
import { Editor } from './Editor'
import { Editors } from './Editors'
import { PageWrapper } from './PageWrapper'
import { Panel } from './Panel'
import { Panels } from './Panels'

export const notificationSystem = React.createRef<any>()

export const App = (): ReactElement => (
  <BrowserRouter basename='/configuration_module/'>
    <NotificationSystem ref={notificationSystem} />
    <Route path='/editor/:_id?'>
      <Editor />
    </Route>
    <Route path='/editors'>
      <PageWrapper>
        <Editors />
      </PageWrapper>
    </Route>
    <Route path='/panel/:application_id/:user_id'>
      <PageWrapper>
        <Panel online={true} />
      </PageWrapper>
    </Route>
    <Route path='/panels/:user_id'>
      <PageWrapper>
        <Panels />
      </PageWrapper>
    </Route>
  </BrowserRouter>
)
