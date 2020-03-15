/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-filename-extension */
import React, { memo } from 'react'
import JsxParser from 'react-jsx-parser'
import * as semantic from 'semantic-ui-react'
import { App } from '../interfaceElements/App'
import { ArrowButton } from '../interfaceElements/ArrowButton'
import { Content } from '../interfaceElements/Content'
import { Footer } from '../interfaceElements/Footer'
import { Header } from '../interfaceElements/Header'
import { Page } from '../interfaceElements/Page'
import { ProgressBar } from '../interfaceElements/ProgressBar'
import { useDispatch } from 'react-redux'
import { codeEditorActions } from '../CodeEditor/actions'
import { panelActions } from '../Panel/actions'

const UnmemorizedCodeRender = ({ code }) => {
  const dispatch = useDispatch()
  const setError = () => {
    dispatch(codeEditorActions.setError({ isError: true }))
    dispatch(panelActions.clear())
  }

  return (
    <JsxParser
      renderError={error => {
        setError()
        return (
          <semantic.Segment padded={true} basic={true}>
            <semantic.Message
              icon='warning circle'
              size='big'
              negative={true}
              content={error.error}
            />
          </semantic.Segment>
        )
      }}
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
      allowUnknownElements={false}
      jsx={code}
    />
  )
}
export const CodeRender = memo(UnmemorizedCodeRender)
