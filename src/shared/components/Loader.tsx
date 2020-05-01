import React from 'react'
import { Dimmer, Loader as BasicLoader } from 'semantic-ui-react'

interface ILoaderProps {
  text?: string
}

export const Loader = ({ text = 'Loading...' }: ILoaderProps) => (
  <Dimmer active={true} inverted={true}>
    <BasicLoader size='medium' content={<h3>{text}</h3>} />
  </Dimmer>
)
