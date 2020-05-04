import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Container, List, Message, Segment } from 'semantic-ui-react'
import { ErrorMessage } from '../../shared/components/ErrorMessage'
import { Loader } from '../../shared/components/Loader'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'
import { IRootState } from '../../store/state'
import { codeEditorActions } from '../CodeEditor/actions'
import { Pagination } from '../Pagination'
import { panelActions } from '../Panel/actions'
import { editorsActions } from './actions'
import './index.css'

export const Editors = (): ReactElement => {
  const { list, isPending, error } = useSelector(
    (state: IRootState) => state.editors,
  )

  const dispatch = useDispatch()

  const handleLoad = useCallback(
    (params?: { currentPage: number }) =>
      dispatch(editorsActions.loadData(params)),
    [dispatch],
  )

  const handleDelete = (_id: string): void => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm('Please, confirm deletion')

    if (confirmed) {
      dispatch(editorsActions.delete({ _id }))
    }
  }

  useEffect(() => {
    handleLoad()
  }, [dispatch, handleLoad])

  const renderList = (): ReactNode => {
    if (list.length) {
      return (
        <Segment className='list-container'>
          <List
            divided={true}
            verticalAlign='middle'
            size='big'
            animated={true}
            selection={true}
          >
            {list.map((item: IApplicationDTO) => (
              <List.Item key={item._id}>
                <Link to={`/editor/${item._id}`}>
                  <List.Header>{item.name}</List.Header>
                </Link>
                <List.Content>
                  <Button
                    icon='delete'
                    onClick={() => handleDelete(item._id as string)}
                  />
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      )
    }

    return (
      <Message>
        <Message.Header>There is no editors yet</Message.Header>
        <p>Click add button and create some new</p>
      </Message>
    )
  }

  if (isPending) {
    return <Loader text='Loading editors...' />
  }

  if (error !== '') {
    return <ErrorMessage error={error} />
  }

  return (
    <Container className='list-container'>
      <Segment className='list-container__header' clearing={true} basic={true}>
        <Link
          to='/editor'
          onClick={() => {
            dispatch(panelActions.clear())
            dispatch(codeEditorActions.clear())
          }}
        >
          <Button
            floated='right'
            icon='add'
            content='Add CP'
            primary={true}
            basic={true}
          />
        </Link>
        <h1>Editors</h1>
      </Segment>

      {renderList()}
      <Pagination onLoad={handleLoad} />
    </Container>
  )
}
