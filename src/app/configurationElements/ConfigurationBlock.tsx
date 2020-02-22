import React from 'react'
import { useSelector } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { IRootState } from '../../store/state'

export const ConfigurationBlock = () => {
    const blocks = useSelector((state: IRootState) => state.panel)
    const panes = Object.keys(blocks).map((blockKey, blockIndex) => ({
        menuItem: blockKey,
        render: () => <Tab.Pane key={blockIndex}>{Object.keys(blocks[blockKey]).map(elementKey => <input />)}</Tab.Pane>
    }))

    return (
        <div className='configuration-block'>
            <Tab panes={panes} />
        </div>
    )
}
