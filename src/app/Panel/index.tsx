/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Container, Message, Segment } from 'semantic-ui-react'
import { ErrorMessage } from '../../shared/components/ErrorMessage'
import { Loader } from '../../shared/components/Loader'
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
    isInitialized,
    renderError,
    isPending,
    error,
    name,
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
      <Container>
        <Segment padded={true} basic={true}>
          <Message
            icon='warning circle'
            size='big'
            negative={true}
            content={renderError}
          />
        </Segment>
      </Container>
    )
  }

  if (isPending) {
    return <Loader text='Loading CP...' />
  }

  if (error !== '') {
    return (
      <Container id='Panel'>
        <ErrorMessage error={error} />
      </Container>
    )
  }

  return (
    <Container id='Panel'>
      {isInitialized && (
        <>
          <div className='panel-header'>
            <Breadcrumb size='massive'>
              {user_id && (
                <>
                  <Breadcrumb.Section>
                    <Link to={`/panels/${user_id}`}>Configuration Panels</Link>
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right chevron' />
                </>
              )}
              <Breadcrumb.Section active>
                {name ? `Configure ${name}` : 'Configuration panel'}
              </Breadcrumb.Section>
            </Breadcrumb>
          </div>

          <ConfigurationBlock />
          <CodeRender code={descriptionCode} />
        </>
      )}
    </Container>
  )
}
