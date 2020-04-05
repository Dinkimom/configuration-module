export interface IBaseElementProps {
  name: string
  type: string
  value: any
  optional?: boolean
  common?: boolean
  color?: string | 'editable'
}
