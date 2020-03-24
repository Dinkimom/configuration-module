export interface ICodeEditorState {
  name: string
  code: string
  toRender: string
  height: number | string
  isPending: boolean
  failure: {
    msg: string
    actionButton?: boolean
  }
}
