import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Dimmer, Loader, Message, Segment } from 'semantic-ui-react'
import { isEmpty } from '../../shared/functions/isEmpty'
import { IRootState } from '../../store/state'
import { CodeRender } from '../CodeRender'
import { ConfigurationBlock } from '../configurationElements/ConfigurationBlock'
import { panelActions } from './actions'
import './index.css'

interface IPanelProps {
  online?: boolean
}

export const Panel = ({ online }: IPanelProps): ReactElement => {
  const {
    descriptionCode,
    pages,
    renderError,
    name,
    isPending,
    error,
    isInitialized,
  } = useSelector((state: IRootState) => state.panel)

  const { application_id, user_id } = useParams<{
    application_id: string
    user_id: string
  }>()

  const dispatch = useDispatch()

  useEffect(() => {
    if (online) {
      dispatch(panelActions.loadData({ application_id, user_id }))
    }
  }, [online, dispatch, application_id, user_id])

  if (renderError) {
    return (
      <Segment padded={true} basic={true}>
        <Message
          icon='warning circle'
          size='big'
          negative={true}
          content={renderError}
        />
      </Segment>
    )
  }

  if (isPending) {
    return (
      <Dimmer active={true} inverted={true}>
        <Loader size='medium' content={<h3>Loading Panel...</h3>} />
      </Dimmer>
    )
  }

  if (error !== '') {
    return (
      <Segment padded={true} basic={true}>
        <Message size='big' negative={true}>
          <Message.Header>{error}</Message.Header>
        </Message>
      </Segment>
    )
  }

  return (
    <Container id='Panel'>
      {!isEmpty(pages) && (
        <>
          <Segment className='panel-header'>
            <h1>Configuration panel{`${name && '. '}${name}`}</h1>
          </Segment>

          <ConfigurationBlock />
        </>
      )}

      <CodeRender code={descriptionCode} />
    </Container>
  )
}
