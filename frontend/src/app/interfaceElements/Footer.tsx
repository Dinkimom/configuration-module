import React, { ReactElement } from 'react'
import { Segment, SegmentProps } from 'semantic-ui-react'

export const Footer = ({ children, ...other }: SegmentProps): ReactElement => (
	<Segment attached='bottom' {...other} className='app__page__footer'>
		{children}
	</Segment>
)
