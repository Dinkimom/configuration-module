/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import JsxParser from 'react-jsx-parser'
import * as semantic from 'semantic-ui-react'
import { App } from '../interfaceElements/App'
import { ArrowButton } from '../interfaceElements/ArrowButton'
import { Content } from '../interfaceElements/Content'
import { Footer } from '../interfaceElements/Footer'
import { Header } from '../interfaceElements/Header'
import { Page } from '../interfaceElements/Page'
import { ProgressBar } from '../interfaceElements/ProgressBar'

export const CodeRender = ({ code }) => {
  try {
    return (
      <JsxParser
        renderError={error => console.error(error)}
        components={{
          ...semantic,
          App,
          Page,
          ArrowButton,
          ProgressBar,
          Header,
          Footer,
          Content,
        }}
        jsx={code}
      />
    )
  } catch (error) {
    console.error(error)
    return null
  }
}
