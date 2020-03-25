export interface ICodeEditorState {
  name: string
  code: string
  height: number | string
  isPending: boolean
  failure: {
    msg: string
    actionButton?: boolean
  }
}
