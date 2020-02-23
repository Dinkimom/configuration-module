/* eslint-disable react/display-name */
import React, { ReactElement, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { IRootState } from '../../store/state'

export const ConfigurationBlock = (): ReactElement => {
    const blocks = useSelector((state: IRootState) => state.panel)
    const panes = Object.keys(blocks).map((blockKey, blockIndex) => ({
        menuItem: blockKey,
        render: (): ReactNode =>
            <Tab.Pane key={blockIndex}>
                {Object.keys(blocks[blockKey]).map((elementKey, elementIndex) => <input key={elementIndex} />)}
            </Tab.Pane>,
    }))

    return (
        <div className='configuration-block'>
            <Tab panes={panes} />
        </div>
    )
}
