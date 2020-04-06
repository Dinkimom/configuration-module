/* eslint-disable react/display-name */
import React, { ReactElement, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Item, Popup, Segment, Tab, Label } from 'semantic-ui-react'
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
    const panes = Object.keys(settings.pages).map((pageKey) => ({
      menuItem: pageKey,
      render: (): ReactNode => (
        <Tab.Pane
          className='configuration-block__tab'
          active={pageKey === currentPage}
          key={pageKey}
          as={Segment.Group}
        >
          {Object.keys(settings.pages[pageKey]).map((elementKey) => (
            <Segment key={elementKey}>
              <h4>
                {elementKey}{' '}
                {settings.pages[pageKey][elementKey].common && (
                  <Popup
                    content='This interface element is shared across multiple pages.'
                    trigger={
                      <Label style={{ marginLeft: '5px', cursor: 'pointer' }}>
                        Common
                      </Label>
                    }
                  />
                )}
              </h4>

              <Item.Group>
                {Object.keys(settings.pages[pageKey][elementKey].params).map(
                  (paramKey, paramIndex) => (
                    <Item key={paramIndex}>
                      <ConfigurationElement
                        name={elementKey}
                        param={paramKey}
                        page={pageKey}
                        type={
                          settings.pages[pageKey][elementKey].params[paramKey]
                            .type
                        }
                        common={settings.pages[pageKey][elementKey].common}
                      />
                    </Item>
                  ),
                )}
              </Item.Group>
            </Segment>
          ))}
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
