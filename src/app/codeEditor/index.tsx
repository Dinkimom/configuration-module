import React, { Component, ReactElement } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Button } from 'semantic-ui-react';
import { CodeRender } from '../codeRender';
import './index.css';

export class CodeEditor extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            code: '<p>Type here some code...</p>',
            toRender: '',
        };

        this.editorDidMount = this.editorDidMount.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    editorDidMount(editor: any) {
        editor.focus();
    }

    onChange(newValue: string) {
        this.setState({
            code: newValue,
        });
    }

    render(): ReactElement {
        const code = this.state.code;
        const options: any = {
            selectOnLineNumbers: true,
            renderLineHighlight: true,
        };
        return (
            <div className='code-editor-container'>
                <div className='code-editor-container__code-editor'>
                    <MonacoEditor
                        width='100%'
                        height='100%'
                        language='html'
                        theme='vs-dark'
                        value={code}
                        options={options}
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                    />

                    <Button
                        fluid={true}
                        color='twitter'
                        onClick={() =>
                            this.setState((state: any) => ({
                                toRender: state.code,
                            }))
                        }
                        disabled={!this.state.code}
                    >
                        Generate
                  </Button>
                </div>
                <div>
                    <CodeRender code={this.state.toRender} />
                </div>
            </div>
        );
    }
}
