import React, { ReactElement, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../store/state'
import { Panel } from '../../Panel'
import './index.css'

interface IAppProps {
  children: ReactNode
}

export const App = ({ children }: IAppProps): ReactElement | null => {
  const isInitialized = Boolean(useSelector((state: IRootState) => state.panel))

  if (isInitialized) {
    return (
      <Panel>
        <div className='app'>{children}</div>
      </Panel>
    )
  }

  return null
}
