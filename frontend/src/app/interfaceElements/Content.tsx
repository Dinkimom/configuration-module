import React, { ReactElement } from 'react'
import { Segment, SegmentProps } from 'semantic-ui-react'

export const Content = ({ children, ...other }: SegmentProps): ReactElement => (
	<Segment attached {...other} className='app__page__body'>
		{children}
	</Segment>
)
