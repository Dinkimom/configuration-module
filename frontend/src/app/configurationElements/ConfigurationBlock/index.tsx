/* eslint-disable react/display-name */
import React, { ReactElement, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Tab } from 'semantic-ui-react'
import { IRootState } from '../../../store/state'
import { panelActions } from '../../Panel/actions'
import { ConfigurationElement } from '../ConfigurationElement'
import './index.css'

export const ConfigurationBlock = (): ReactElement | null => {
  const { settings, isInitialized } = useSelector(
    (state: IRootState) => state.panel,
  )
  const { currentPage } = useSelector((state: IRootState) => state.panel)

  const dispatch = useDispatch()
  const handleTabChange = (evt: any, data: any): void => {
    dispatch(
      panelActions.setCurrentPage({
        name: data.panes[data.activeIndex].menuItem,
      }),
    )
  }

  if (isInitialized) {
    const panes = Object.keys(settings.pages).map(pageKey => ({
      menuItem: pageKey,
      render: (): ReactNode => (
        <Tab.Pane
          active={pageKey === currentPage}
          attached={false}
          key={pageKey}
        >
          {Object.keys(settings.pages[pageKey]).map(
            (elementKey, elementIndex) => (
              <ConfigurationElement
                name={elementKey}
                page={pageKey}
                type={settings.pages[pageKey][elementKey].type}
                key={elementIndex}
                common={settings.pages[pageKey][elementKey].common}
              />
            ),
          )}
        </Tab.Pane>
      ),
    }))

    return (
      <Form className='configuration-block'>
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

  return null
}
