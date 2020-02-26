/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/unbound-method */
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import { Resizable } from 're-resizable'
import React, { Component, ReactElement } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { connect } from 'react-redux'
import 'react-resizable/css/styles.css'
import { bindActionCreators, Dispatch } from 'redux'
import { Button } from 'semantic-ui-react'
import { codeExample } from '../../shared/constants/codeExample'
import { CodeRender } from '../codeRender'
import { panelActions } from '../panel/actions'
import './index.css'
require('codemirror/mode/jsx/jsx')

class CodeEditor extends Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			code: codeExample,
			toRender: '',
			height: '40vh',
		}
	}

	public handleMinimizeWindow = (): void => this.setState({ height: 50 })

	public handleExpandWindow = (): void => this.setState({ height: window.window.innerHeight })

	render(): ReactElement {
		const { code } = this.state
		const options = {
			mode: 'jsx',
			theme: 'material-darker',
			lineNumbers: true,
		}
		return (
			<div className='code-editor-container'>
				<div className='code-editor-container__code-render'>
					<CodeRender code={this.state.toRender} />
				</div>
				<Resizable
					className='code-editor-container__code-editor'
					defaultSize={{
						width: '100%',
						height: '40vh',
					}}
					size={{ width: '100%', height: this.state.height }}
					onResizeStop={(e, direction, ref, d) => {
						this.setState((state: any) => ({
							width: state.width + d.width,
							height: state.height + d.height,
						}))
					}}
					minHeight={50}
					minWidth='100%'
					maxHeight={window.window.innerHeight}
				>
					<CodeMirror
						value={code}
						options={options}
						onChange={(editor, data, value) => {
							this.setState({ code: value })
						}}
						onBeforeChange={(editor, data, value) => {
							this.setState({ code: value })
						}}
					/>
					<Button.Group>
						<Button
							icon='expand'
							onClick={this.handleExpandWindow}
							disabled={this.state.height === window.window.innerHeight}
							inverted={true}
						/>
						<Button
							icon='window minimize'
							onClick={this.handleMinimizeWindow}
							disabled={this.state.height === 50}
							inverted={true}
						/>
					</Button.Group>

					<Button
						icon='play'
						inverted={true}
						content='Generate'
						labelPosition='left'
						onClick={() => {
							this.props.actions.clear()
							this.setState((state: any) => ({
								toRender: state.code,
							}))
						}}
						disabled={!this.state.code || this.state.code === this.state.toRender}
						id='GenerateButton'
					/>
				</Resizable>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch: Dispatch): any => ({
	actions: bindActionCreators(panelActions, dispatch),
})

export default connect(null, mapDispatchToProps)(CodeEditor)
