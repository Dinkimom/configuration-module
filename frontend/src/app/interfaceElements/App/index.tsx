import React, { ReactElement, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { panelActions } from '../../Panel/actions'
import './index.css'
import { IRootState } from '../../../store/state'

interface IAppProps {
  children: ReactNode
}

export const App = ({ children }: IAppProps): ReactElement | null => {
  const { isInitialized } = useSelector((state: IRootState) => state.panel)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isInitialized) {
      dispatch(panelActions.init())
    }
  }, [isInitialized, dispatch])

  if (isInitialized) {
    return <div className='app'>{children}</div>
  }

  return null
}
