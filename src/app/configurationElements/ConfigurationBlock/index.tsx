/* eslint-disable react/display-name */
import React, { ReactElement, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Tab } from 'semantic-ui-react'
import { IRootState } from '../../../store/state'
import { panelActions } from '../../Panel/actions'
import { ConfigurationElement } from '../ConfigurationElement'
import './index.css'

export const ConfigurationBlock = (): ReactElement => {
  const blocks = useSelector((state: IRootState) => state.panel.pages)
  const { currentPage } = useSelector((state: IRootState) => state.panel)

  const dispatch = useDispatch()
  const handleTabChange = (evt: any, data: any): void => {
    dispatch(
      panelActions.setCurrentPage({
        name: data.panes[data.activeIndex].menuItem,
      }),
    )
  }

  const panes = Object.keys(blocks).map((blockKey, blockIndex) => ({
    menuItem: blockKey,
    render: (): ReactNode => (
      <Tab.Pane
        active={blockKey === currentPage}
        attached={false}
        key={blockIndex}
      >
        {Object.keys(blocks[blockKey]).map((elementKey, elementIndex) => (
          <Form.Field key={elementIndex}>
            <label>{elementKey}</label>
            <ConfigurationElement
              name={elementKey}
              page={blockKey}
              type={blocks[blockKey][elementKey].type}
            />
          </Form.Field>
        ))}
      </Tab.Pane>
    ),
  }))

  return (
    <Form className='configuration-block'>
      <h3>Pages</h3>
      <Tab
        onTabChange={handleTabChange}
        menu={{ fluid: true, vertical: true }}
        menuPosition='left'
        panes={panes}
        grid={{ paneWidth: 10, tabWidth: 6 }}
      />
    </Form>
  )
}
