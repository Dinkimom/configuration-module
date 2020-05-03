import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  Accordion,
  AccordionTitleProps,
  Button,
  Dropdown,
  Icon,
  Image,
  Message,
  Modal,
  Progress,
  Table,
} from 'semantic-ui-react'
import { colors } from '../../shared/constants/colors'
import { sizes } from '../../shared/constants/sizes'
import { IRootState } from '../../store/state'
import { howToActions } from './actions'
import './index.css'

interface ICodeSampleProps {
  code: string
}
const CodeSample = ({ code }: ICodeSampleProps) => (
  <SyntaxHighlighter showLineNumbers={true} language='jsx'>
    {code}
  </SyntaxHighlighter>
)

export const HowTo = () => {
  const { isOpened } = useSelector((state: IRootState) => state.howTo)
  const dispatch = useDispatch()

  const handleClose = () => dispatch(howToActions.close())

  const [activeIndex, setActiveIndex] = useState(-1)

  const handleItemClick = (e: any, titleProps: AccordionTitleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex as number)
  }

  return (
    <Modal
      className='HowTo'
      size='fullscreen'
      open={isOpened}
      closeIcon={true}
      onClose={handleClose}
    >
      <Modal.Header as='h1'>
        <Icon name='question circle outline' />
        Documentation
      </Modal.Header>
      <Modal.Content as='Container'>
        <h2>How to use the configuration panel (CP) editor?</h2>
        <h3>If you're going to create a new one CP:</h3>
        <ul>
          <li>
            Write description of mobile application interface using{' '}
            <a href='#language'>special language</a>;
          </li>
          <li>
            Press <Button size='mini' icon='play' /> to generate CP. After
            generation you can try out generated CP;
          </li>
          <li>
            If CP satisfiable, you can add it to the system. Press{' '}
            <Button size='mini' icon='add' /> to open modal form;
          </li>
          <li>At modal form type name of CP. Name must be unique;</li>
          <li>
            Press{' '}
            <Button primary={true} size='mini'>
              Create
            </Button>
          </li>
          <li>
            After after CP added you will be redirected to editor of created CP.
          </li>
        </ul>

        <h3>If you're editing created before CP:</h3>
        <ul>
          <li>
            Edit description of mobile application interface using{' '}
            <a href='#language'>special language</a>;
          </li>
          <li>
            Press <Button size='mini' icon='play' /> to generate CP. After
            generation you can try out generated CP;
          </li>
          <li>
            If CP satisfiable, you can save changes. Press{' '}
            <Button size='mini' icon='add' /> to open modal form;
          </li>
          <li>
            At modal form type new name of CP (if you want to change the name).
            Name must be unique;
            <br />
            After saving changes all users settings of changed CP of mobile
            application will be reset to defaults!
          </li>
          <li>
            Press{' '}
            <Button primary={true} size='mini'>
              Update
            </Button>
          </li>
        </ul>

        <h2 id='language'>Mobile application interface description language</h2>
        <h3>This language based on JSX and UI library Semantic UI.</h3>

        <p>
          It's created to help writing description of interface of mobile
          application and than generate CP by description. All you need just
          follow the rules and then just press button{' '}
          <Button size='tiny' icon='play' />
          <br />
          You can use all components of Semantic UI library in your mobile
          interface description or any other html tags. Semantic UI
          documentation right in this window{' '}
          <a href='#documentation'>
            below <Icon name='arrow down' />
          </a>
          .
        </p>

        <h3>Language contains of special elements:</h3>
        <ul>
          <li>
            Structure elements:
            <ul>
              <li>
                <a href='#App'>App</a>
              </li>
              <li>
                <a href='#Page'>Page</a>
              </li>
            </ul>
          </li>
          <li>
            Configurable interface elements:
            <ul>
              <li>
                <a href='#ProgressBar'>ProgressBar</a>
              </li>
              <li>
                <a href='#SelectableImage'>SelectableImage</a>
              </li>
              <li>
                <a href='#ArrowButton'>ArrowButton</a>
              </li>
              <li>
                <a href='#RetryButton'>RetryButton</a>
              </li>
            </ul>
          </li>
          <li>Other components of Semantic UI library.</li>
        </ul>

        <h3>There are some main rules of description writing:</h3>
        <ul>
          <li>
            App component must be presented in description and must be root
            parent element;
          </li>
          <li>App must include only Page elements;</li>
          <li>
            There must be at least one Page element with children components;
          </li>
        </ul>

        <h3>Sample of base description structure:</h3>
        <CodeSample
          code={'<App><Page name=\'Sample page\'>/* Some interface elements here... */</Page></App>'}
        />

        <h3>Configurable interface elements props:</h3>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Prop name</Table.HeaderCell>
              <Table.HeaderCell width='4'>Type</Table.HeaderCell>
              <Table.HeaderCell>Required</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>name</Table.Cell>
              <Table.Cell>string</Table.Cell>
              <Table.Cell>true</Table.Cell>
              <Table.Cell>Name of the element.</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>size</Table.Cell>
              <Table.Cell>
                One of sizes:{' '}
                <Dropdown
                  defaultValue={sizes[0].value}
                  selection
                  compact
                  options={sizes}
                />{' '}
                or <a href='#editable'>'editable'</a>
              </Table.Cell>
              <Table.Cell>false</Table.Cell>
              <Table.Cell>Sie of the element.</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>color</Table.Cell>
              <Table.Cell>
                One of colors:{' '}
                <Dropdown
                  defaultValue={colors[0].value}
                  selection
                  compact
                  options={colors}
                />{' '}
                or <a href='#editable'>'editable'</a>
              </Table.Cell>
              <Table.Cell>false</Table.Cell>
              <Table.Cell>Color of the element.</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>common</Table.Cell>
              <Table.Cell>boolean</Table.Cell>
              <Table.Cell>false</Table.Cell>
              <Table.Cell>
                If you have elements which shared across pages you can set
                'common' to add ability to change settings of the element across
                pages. If you change settings of common element at one of the
                pages it will be automatically changed across pages.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>optional</Table.Cell>
              <Table.Cell>boolean</Table.Cell>
              <Table.Cell>false</Table.Cell>
              <Table.Cell>
                Makes element optional and add ability to hide it.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Message id='editable' info={true}>
          <p>
            By setting 'editable' for one of the props you can add more
            configurable options for interface element.
          </p>
        </Message>

        <h3>More about components:</h3>
        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleItemClick}
            id='App'
          >
            <h3>
              <Icon name='dropdown' />
              App
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              App tag is a main root element. Description must include App tag.
            </p>
            <h3>Code sample:</h3>
            <CodeSample code='<App></App>' />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleItemClick}
            id='Page'
          >
            <h3>
              <Icon name='dropdown' />
              Page
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>Page tag helps to separate mobile interface app on pages.</p>
            <h3>Props:</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Prop name</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Required</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>name</Table.Cell>
                  <Table.Cell>string</Table.Cell>
                  <Table.Cell>true</Table.Cell>
                  <Table.Cell>Name of the page.</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <h3>Code sample:</h3>
            <CodeSample code="<Page name='Sample page'></Page>" />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleItemClick}
            id='ProgressBar'
          >
            <h3>
              <Icon name='dropdown' />
              ProgressBar
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              ProgressBar is an interface element. Extends{' '}
              <a href='https://react.semantic-ui.com/modules/progress/'>
                Semantic UI progress
              </a>{' '}
              and all its props.
            </p>

            <h3>How it looks like:</h3>
            <Progress percent={11} />
            <h3>Code sample:</h3>
            <CodeSample code="<ProgressBar name='Progress'/>" />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={handleItemClick}
            id='SelectableImage'
          >
            <h3>
              <Icon name='dropdown' />
              SelectableImage
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <p>
              SelectableImage is an interface element. Extends{' '}
              <a href='https://react.semantic-ui.com/modules/image/'>
                Semantic UI image
              </a>{' '}
              and all its props.
            </p>
            <h3>Props:</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Prop name</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Required</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>options</Table.Cell>
                  <Table.Cell>
                    {"{text: 'Text of option', value: 'URL to image'}[]"}
                  </Table.Cell>
                  <Table.Cell>true</Table.Cell>
                  <Table.Cell>Selectable options of element.</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <h3>How it looks like:</h3>
            <Image
              src='https://react.semantic-ui.com/images/wireframe/image.png'
              size='small'
            />
            <h3>Code sample:</h3>
            <CodeSample
              code={`<SelectableImage 
  name='Image' 
  options={[ /* Array of options */]} 
/>`}
            />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 4}
            index={4}
            onClick={handleItemClick}
            id='ArrowButton'
          >
            <h3>
              <Icon name='dropdown' />
              ArrowButton
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 4}>
            <p>
              ArrowButton is an interface element. Extends{' '}
              <a href='https://react.semantic-ui.com/modules/button/'>
                Semantic UI button
              </a>{' '}
              and all its props.
            </p>
            <h3>Props:</h3>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Prop name</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Required</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>direction</Table.Cell>
                  <Table.Cell>'left' or 'right'</Table.Cell>
                  <Table.Cell>false</Table.Cell>
                  <Table.Cell>
                    Direction of arrow button. Default value: 'left'.
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <h3>How it looks like:</h3>
            <Button icon='arrow left' />
            <h3>Code sample:</h3>
            <CodeSample code="<ArrowButton direction='left' name='Prev'/>" />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 5}
            index={5}
            onClick={handleItemClick}
            id='RetryButton'
          >
            <h3>
              <Icon name='dropdown' />
              RetryButton
            </h3>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 5}>
            <p>
              RetryButton is an interface element. Extends{' '}
              <a href='https://react.semantic-ui.com/modules/button/'>
                Semantic UI button
              </a>{' '}
              and all its props.
            </p>
            <h3>How it looks like:</h3>
            <Button icon='redo' />
            <h3>Code sample:</h3>
            <CodeSample code="<RetryButton name='Retry'/>" />
          </Accordion.Content>
        </Accordion>
        <br />
        <iframe
          id='documentation'
          width='100%'
          height='500px'
          src='https://react.semantic-ui.com/'
        />
      </Modal.Content>
    </Modal>
  )
}
