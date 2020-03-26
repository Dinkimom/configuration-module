import { IApplicationDTO } from '../../shared/types/IApplicationDTO'

export interface IEditorsState {
  list: IApplicationDTO[]
  isPending: boolean
  error: string
}
