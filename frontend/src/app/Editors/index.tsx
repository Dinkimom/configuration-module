import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Dimmer,
  List,
  Loader,
  Pagination,
  Segment,
  Message,
} from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { editorsActions } from './actions'
import './index.css'

export const Editors = () => {
  const { list, isPending, error } = useSelector(
    (state: IRootState) => state.editors,
  )

  console.log(list)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(editorsActions.loadData())
  }, [dispatch])

  const renderList = (): ReactNode => {
    if (list.length) {
      return (
        <Segment>
          <List
            divided={true}
            verticalAlign='middle'
            size='big'
            animated={true}
            selection={true}
          >
            {list.map(item => (
              <List.Item key={item._id}>
                <List.Content floated='right'>
                  <Link to={`/editor/${item._id}`}>
                    <Button icon='edit outline' />
                  </Link>
                  <Button icon='delete' />
                </List.Content>
                <List.Content>
                  <List.Header>
                    <Link to={`/editor/${item._id}`}>{item.name}</Link>
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      )
    }

    return null
  }

  if (isPending) {
    return (
      <Dimmer active={true} inverted={true}>
        <Loader size='medium' content={<h3>Loading...</h3>} />
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
    <Container className='list-container'>
      <Segment className='list-container__header' clearing={true} basic={true}>
        <Button
          floated='right'
          icon='add'
          content={<Link to='/editor'>Add CP</Link>}
          primary={true}
        />
        <h1>Editors</h1>
      </Segment>

      {renderList()}
      <Pagination defaultActivePage={1} totalPages={3} />
    </Container>
  )
}
