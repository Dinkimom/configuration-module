import React from 'react'
import { Message, Segment } from 'semantic-ui-react'

interface IErrorMessage {
  error: string
}

export const ErrorMessage = ({ error }: IErrorMessage) => (
  <Segment className='error-message' padded={true} basic={true}>
    <Message size='big' negative={true}>
      <Message.Header>{error}</Message.Header>
    </Message>
  </Segment>
)
