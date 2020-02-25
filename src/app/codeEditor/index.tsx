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
				<Resizable
					className='code-editor-container__code-editor'
					defaultSize={{
						width: '100%',
						height: '40vh',
					}}
					minHeight={50}
					minWidth='100%'
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
						disabled={!this.state.code}
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
