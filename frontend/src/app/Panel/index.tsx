import React, { ReactElement, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Segment } from 'semantic-ui-react'
import { useEditorModes } from '../../shared/hooks/useEditorModes'
import { IRootState } from '../../store/state'
import { ConfigurationBlock } from '../configurationElements/ConfigurationBlock'
import './index.css'

interface IPanelProps {
  children: ReactNode
}

export const Panel = ({ children }: IPanelProps): ReactElement | null => {
  const isInitialized = Boolean(useSelector((state: IRootState) => state.panel))
  const { _id } = useEditorModes()

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (_id !== undefined) {
  //     dispatch(panelActions.setMode({ online: Boolean(_id) }))
  //   }

  // }, [dispatch, isInitialized, _id])

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
