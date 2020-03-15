import React, { ReactNode, ReactElement, useEffect } from 'react'
import { Container, Segment, Button } from 'semantic-ui-react'
import { ConfigurationBlock } from '../configurationElements/ConfigurationBlock'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../../store/state'
import { panelActions } from './actions'

interface IPanelProps {
  children: ReactNode
  online?: boolean
}

export const Panel = ({
  children,
  online,
}: IPanelProps): ReactElement | null => {
  const isInitialized = Boolean(useSelector((state: IRootState) => state.panel))

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(panelActions.setMode({ online: Boolean(online) }))
  }, [dispatch, isInitialized, online])

  if (isInitialized) {
    return (
      <Container id='Panel'>
        <Segment className='panel-header'>
          <h1>Configuration panel</h1>

          <Button.Group>
            <Button icon='save outline' />
            <Button icon='repeat' />
          </Button.Group>
        </Segment>

        <ConfigurationBlock />
        {children}
      </Container>
    )
  }

  return null
}
