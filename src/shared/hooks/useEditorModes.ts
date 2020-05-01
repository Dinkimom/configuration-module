import { EditorModes } from '../enums/EditorModes'
import { useParams } from 'react-router-dom'

export const useEditorModes = (): { _id?: string; mode: EditorModes } => {
  const { _id } = useParams()
  let mode: EditorModes

  if (_id === undefined) {
    mode = EditorModes.create
  } else {
    mode = EditorModes.edit
  }

  return { _id, mode }
}
