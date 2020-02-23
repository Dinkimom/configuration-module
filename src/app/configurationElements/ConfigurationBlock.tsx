/* eslint-disable react/display-name */
import React, { ReactElement, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Tab } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { panelActions } from '../panel/actions'

export const ConfigurationBlock = (): ReactElement => {
    const blocks = useSelector((state: IRootState) => state.panel.pages)
    const { currentPage } = useSelector((state: IRootState) => state.panel)

    const dispatch = useDispatch()
    const handleTabChange = (evt: any, data: any): void => {
        dispatch(panelActions.setCurrentPage({ name: data.panes[data.activeIndex].menuItem }))
    }

    const panes = Object.keys(blocks).map((blockKey, blockIndex) => ({
        menuItem: blockKey,
        render: (): ReactNode => (
            <Tab.Pane active={blockKey === currentPage} attached={false} key={blockIndex}>
                {Object.keys(blocks[blockKey]).map((elementKey, elementIndex) => (
                    <Form.Field key={elementIndex}>
                        <label>{elementKey}</label>
                        <Input name={elementKey} />
                    </Form.Field>
                ))}
            </Tab.Pane>
        ),
    }))

    return (
        <Form className='configuration-block'><Tab onTabChange={handleTabChange} menu={{ secondary: true }} panes={panes} /></Form>
    )
}
