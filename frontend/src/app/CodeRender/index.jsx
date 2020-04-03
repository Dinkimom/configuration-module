/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-filename-extension */
import React, { memo } from 'react'
import JsxParser from 'react-jsx-parser'
import { useDispatch } from 'react-redux'
import * as semantic from 'semantic-ui-react'
import { App } from '../interfaceElements/App'
import { ArrowButton } from '../interfaceElements/ArrowButton'
import { Content } from '../interfaceElements/Content'
import { Footer } from '../interfaceElements/Footer'
import { Header } from '../interfaceElements/Header'
import { Page } from '../interfaceElements/Page'
import { ProgressBar } from '../interfaceElements/ProgressBar'
import { RetryButton } from '../interfaceElements/RetryButton'
import { SelectableImage } from '../interfaceElements/SelectableImage'
import { panelActions } from '../Panel/actions'

const UnmemorizedCodeRender = ({ code }) => {
  const dispatch = useDispatch()
  const setError = (error) => {
    dispatch(panelActions.clear())
    dispatch(panelActions.setRenderError({ error }))
  }

  return (
    <JsxParser
      renderError={(error) => {
        setError(error.error)
        return null
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
        RetryButton,
        SelectableImage,
      }}
      allowUnknownElements={false}
      jsx={code}
    />
  )
}
export const CodeRender = memo(UnmemorizedCodeRender)
