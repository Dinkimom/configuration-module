import React, { ReactNode, ReactElement } from 'react'
import { Container, Segment, Button } from 'semantic-ui-react'
import { ConfigurationBlock } from '../configurationElements/ConfigurationBlock'
import './index.css'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/state'

interface IPanelProps {
  children: ReactNode
}

export const Panel = ({ children }: IPanelProps): ReactElement | null => {
  const isInitialized = Boolean(useSelector((state: IRootState) => state.panel))

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
