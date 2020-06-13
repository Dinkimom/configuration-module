import React, { ReactElement, ReactNode } from 'react'
import { Button, Container, Icon, Popup } from 'semantic-ui-react'
import './index.css'

interface IPageWrapperProps {
  children: ReactNode
}

export const PageWrapper = ({ children }: IPageWrapperProps): ReactElement => (
  <div className='page-wrapper'>
    <header>
      <Container>
        <span className='logo'>
          <Icon name='setting' />
          Module
        </span>
        <Popup
          on='click'
          trigger={<Icon className='user' name='user circle' size='big' />}
          content={
            <Button.Group vertical={true} basic={true}>
              <a href='/personalArea/1'>
                <Button icon='id card' content='Profile' />
              </a>
              <a href='/signout'>
                <Button icon='logout' content='Logout' />
              </a>
            </Button.Group>
          }
          position='bottom right'
        />
      </Container>
    </header>

    <main>{children}</main>
  </div>
)
