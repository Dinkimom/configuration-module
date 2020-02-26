export const codeExample = `
	<App>
		<Page name='Home page'>
			<Header>
				<ArrowButton name='Prev' direction='left' floated='left' />
				<ArrowButton name='Next' direction='right' floated='right' />
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
				<ProgressBar name='Progress bar' />
			</Footer>
		</Page>

		<Page name='Friends'>
			<Header>
				<ProgressBar name='Progress bar' />
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
			<Footer secondary></Footer>
		</Page>
	</App>
`
