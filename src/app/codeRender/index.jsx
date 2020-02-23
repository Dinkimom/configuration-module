/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import JsxParser from 'react-jsx-parser'
import * as semantic from 'semantic-ui-react'
import { App } from '../interfaceComponents/App'
import { ArrowButton } from '../interfaceComponents/ArrowButton'
import { Page } from '../interfaceComponents/Page'
import './index.css'

export const CodeRender = ({ code }) => {
	try {
		return (
			<JsxParser
				renderError={error => console.error(error)}
				components={{ ...semantic, App, Page, ArrowButton }}
				jsx={code}
			/>
		)
	} catch (error) {
		console.error(error)
		return null
	}
}
