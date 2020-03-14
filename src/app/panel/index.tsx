import React, { ReactNode, ReactElement } from 'react'
import { Container, Segment, Button } from 'semantic-ui-react'
import { ConfigurationBlock } from '../configurationElements/ConfigurationBlock'
import './index.css'

interface IPanelProps {
  children: ReactNode
}

export const Panel = ({ children }: IPanelProps): ReactElement => (
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
