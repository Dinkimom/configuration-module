import React, { ReactElement, ReactNode } from 'react'
import { Panel } from '../../Panel'
import './index.css'

interface IAppProps {
  children: ReactNode
}

export const App = ({ children }: IAppProps): ReactElement | null => (
  <Panel>
    <div className='app'>{children}</div>
  </Panel>
)
