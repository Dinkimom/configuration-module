/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Container, List, Segment } from 'semantic-ui-react'
import { ErrorMessage } from '../../shared/components/ErrorMessage'
import { Loader } from '../../shared/components/Loader'
import { IApplicationDTO } from '../../shared/types/IApplicationDTO'
import { IRootState } from '../../store/state'
import { editorsActions } from '../Editors/actions'
import { Pagination } from '../Pagination'
import { panelActions } from '../Panel/actions'

export const Panels = (): ReactElement => {
  const { list, isPending, error } = useSelector(
    (state: IRootState) => state.editors,
  )

  const { user_id } = useParams()

  const dispatch = useDispatch()

  const handleLoad = useCallback(
    (params?: { currentPage: number }) =>
      dispatch(editorsActions.loadData(params)),
    [dispatch],
  )

  useEffect(() => {
    handleLoad()
    dispatch(panelActions.clear())
  }, [dispatch, handleLoad])

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
            {list.map((item: IApplicationDTO) => (
              <List.Item key={item._id}>
                <Link to={`/panel/${item._id}/${user_id}`}>
                  <List.Header>{item.name}</List.Header>
                </Link>
              </List.Item>
            ))}
          </List>
        </Segment>
      )
    }

    return null
  }

  if (isPending) {
    return <Loader text='Loading panels...' />
  }

  if (error !== '') {
    return <ErrorMessage error={error} />
  }

  return (
    <Container className='list-container'>
      <Segment className='list-container__header' clearing={true} basic={true}>
        <h1>Configuration Panels</h1>
      </Segment>

      {renderList()}
      <Pagination onLoad={handleLoad} />
    </Container>
  )
}
