import React from 'react'
import JsxParser from 'react-jsx-parser'
import * as semantic from 'semantic-ui-react'
import { ArrowButton } from '../interfaceComponents/ArrowButton'

export const CodeRender = ({ code }) => {
	try {
		return (
			<JsxParser
				renderError={error => console.error(error)}
				components={{ ...semantic, ArrowButton }}
				jsx={code}
			/>
		)
	} catch (error) {
		console.error(error)
		return null
	}
}
