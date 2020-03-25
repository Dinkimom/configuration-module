import React, { ReactElement, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Segment, Message } from 'semantic-ui-react'
import { useEditorModes } from '../../shared/hooks/useEditorModes'
import { IRootState } from '../../store/state'
import { ConfigurationBlock } from '../configurationElements/ConfigurationBlock'
import './index.css'
import { CodeRender } from '../CodeRender'
import { isEmpty } from '../../shared/functions/isEmpty'

export const Panel = (): ReactElement => {
  const { descriptionCode, pages, renderError } = useSelector(
    (state: IRootState) => state.panel,
  )
  const { _id } = useEditorModes()

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

  return (
    <Container id='Panel'>
      {!isEmpty(pages) && (
        <>
          <Segment className='panel-header'>
            <h1>Configuration panel</h1>

            <Button.Group>
              <Button icon='save outline' />
              <Button icon='repeat' />
            </Button.Group>
          </Segment>

          <ConfigurationBlock />
        </>
      )}

      <CodeRender code={descriptionCode} />
    </Container>
  )
}
