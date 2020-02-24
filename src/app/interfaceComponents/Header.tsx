import React, { ReactElement } from 'react'
import { Segment, SegmentProps } from 'semantic-ui-react'

export const Header = ({ children, ...other }: SegmentProps): ReactElement => (
	<Segment attached='top' {...other} className='app__page__header'>
		{children}
	</Segment>
)
