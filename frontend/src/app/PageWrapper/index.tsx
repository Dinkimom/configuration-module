import React, { ReactNode } from 'react'
import { Button, Icon, Popup } from 'semantic-ui-react'
import './index.css'

interface IPageWrapperProps {
  children: ReactNode
}

export const PageWrapper = ({ children }: IPageWrapperProps) => (
  <div className='page-wrapper'>
    <header>
      <span className='logo'>
        <Icon name='setting' />
        Module
      </span>
      <Popup
        on='click'
        trigger={<Icon className='user' name='user circle' size='big' />}
        content={
          <Button.Group vertical={true} basic={true}>
            <Button icon='chevron left' content='Back to System' />
            <Button icon='log out' content='Logout' />
          </Button.Group>
        }
        position='bottom right'
      />
    </header>

    <nav></nav>
    <main>{children}</main>
  </div>
)
