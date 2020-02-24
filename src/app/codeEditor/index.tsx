/* eslint-disable @typescript-eslint/unbound-method */
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import React, { Component, ReactElement } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { Button } from 'semantic-ui-react'
import { CodeRender } from '../codeRender'
import { panelActions } from '../panel/actions'
import './index.css'
require('codemirror/mode/jsx/jsx')

class CodeEditor extends Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			code: `
			<App>
				<Page name="Home page">
					<Header>
						<ArrowButton name="Prev" direction="left" floated="left" />
						<ArrowButton name="Next" direction="right" floated="right" />
					</Header>
					<Content>
						<Grid columns={1} divided>
							<Grid.Row>
							<Grid.Column>
								<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
							</Grid.Column>
							</Grid.Row>
							<Grid.Row>
							<Grid.Column>
								<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
							</Grid.Column>
							</Grid.Row>
							<Grid.Row>
							<Grid.Column>
								<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
							</Grid.Column>
							</Grid.Row>
						</Grid>
					</Content>
					<Footer>
						<ProgressBar name="Progress bar" />
					</Footer> 
				</Page>

					<Page name="Friends">
					<Header>
						<ProgressBar name="Progress bar" />
					</Header>
					<Content>
						<List selection verticalAlign='middle'>
							<List.Item>
							<Image avatar src='https://react.semantic-ui.com/images/wireframe/image.png' />
							<List.Content>
								<List.Header>Helen</List.Header>
							</List.Content>
							</List.Item>
							<List.Item>
							<Image avatar src='https://react.semantic-ui.com/images/wireframe/image.png' />
							<List.Content>
								<List.Header>Christian</List.Header>
							</List.Content>
							</List.Item>
							<List.Item>
							<Image avatar src='https://react.semantic-ui.com/images/wireframe/image.png' />
							<List.Content>
								<List.Header>Daniel</List.Header>
							</List.Content>
							</List.Item>
						</List>
					</Content>
					<Footer secondary>
					</Footer> 
				</Page>
            </App>
            `,
			toRender: '',
		}

		this.editorDidMount = this.editorDidMount.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	public editorDidMount(editor: any): void {
		editor.focus()
	}

	public onChange(newValue: string): void {
		this.setState({
			code: newValue,
		})
	}

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
				<div className='code-editor-container__code-editor'>
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

					<Button
						fluid={true}
						color='twitter'
						onClick={() => {
							this.props.actions.clear()
							this.setState((state: any) => ({
								toRender: state.code,
							}))
						}}
						disabled={!this.state.code}
					>
						Generate
					</Button>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch: Dispatch): any => ({
	actions: bindActionCreators(panelActions, dispatch),
})

export default connect(null, mapDispatchToProps)(CodeEditor)
