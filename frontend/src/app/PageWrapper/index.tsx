import React, { ReactNode } from 'react'
import './index.css'
import { Link, useParams, Route } from 'react-router-dom'
import { Icon, Popup, Button } from 'semantic-ui-react'

interface IPageWrapperProps {
  children: ReactNode
}

export const PageWrapper = ({ children }: IPageWrapperProps) => {
  const { user_id } = useParams()

  return (
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
}
