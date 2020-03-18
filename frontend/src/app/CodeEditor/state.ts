export interface ICodeEditorState {
  name: string
  code: string
  toRender: string
  error: boolean
  height: number | string
  isPending: boolean
}
