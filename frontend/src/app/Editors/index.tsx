import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Dimmer,
  List,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { Pagination } from '../Pagination'
import { editorsActions } from './actions'
import './index.css'

export const Editors = () => {
  const { list, isPending, error } = useSelector(
    (state: IRootState) => state.editors,
  )

  const dispatch = useDispatch()

  const handleLoad = (params?: { currentPage: number }) =>
    dispatch(editorsActions.loadData(params))

  useEffect(() => {
    handleLoad()
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
        <Link to='/editor'>
          <Button floated='right' icon='add' content='Add CP' primary={true} />
        </Link>
        <h1>Editors</h1>
      </Segment>

      {renderList()}
      <Pagination onLoad={handleLoad} />
    </Container>
  )
}
