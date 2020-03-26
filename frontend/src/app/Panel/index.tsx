import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import {
  Container,
  Message,
  Segment,
  Button,
  Breadcrumb,
} from 'semantic-ui-react'
import { ErrorMessage } from '../../shared/components/ErrorMessage'
import { Loader } from '../../shared/components/Loader'
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
    return <Loader text='Loading CP...' />
  }

  if (error !== '') {
    return <ErrorMessage error={error} />
  }

  return (
    <Container id='Panel'>
      {!isEmpty(pages) && (
        <>
          <div className='panel-header'>
            <Breadcrumb size='massive'>
              {user_id && (
                <>
                  <Breadcrumb.Section link>
                    <Link to={`/panels/${user_id}`}>Panels</Link>
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right chevron' />
                </>
              )}
              <Breadcrumb.Section active>
                Configuration panel
              </Breadcrumb.Section>
            </Breadcrumb>
          </div>

          <ConfigurationBlock />
        </>
      )}

      <CodeRender code={descriptionCode} />
    </Container>
  )
}
