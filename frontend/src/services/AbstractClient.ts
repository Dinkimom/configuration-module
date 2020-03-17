import axios, { AxiosRequestConfig } from 'axios'
import { serverEntryPoint } from '../shared/constants/serverEntryPoint'
import { RequestsEnum } from '../shared/enums/RequestsEnum'
import { Entity } from '../shared/types/Entity'

export abstract class AbstractClient {
  public entity: Entity
  public URL: string
  public axios = axios

  public constructor(entity: Entity) {
    this.entity = entity
    this.URL = `${serverEntryPoint}${this.entity}`
  }

  public helper = (
    request: RequestsEnum,
    data: {
      _id?: string
      body?: any
    },
  ): AxiosRequestConfig => {
    switch (request) {
      case RequestsEnum.add:
        return {
          url: `${this.URL}/item`,
          method: 'POST',
          data: data.body,
        }
      case RequestsEnum.update:
        return {
          url: `${this.URL}/item/${data._id}`,
          method: 'PUT',
          data: data.body,
        }
      case RequestsEnum.delete:
        return {
          url: `${this.URL}/item/${data._id}`,
          method: 'DELETE',
        }
      case RequestsEnum.getItem:
        return {
          url: `${this.URL}/item/${data._id}`,
          method: 'GET',
        }
      case RequestsEnum.getItems:
        return {
          url: `${this.URL}/items/`,
          method: 'GET',
        }
      default:
        return {} as AxiosRequestConfig
    }
  }

  public abstract add: (...args: any) => any
  public abstract update: (...args: any) => any
  public abstract delete: (...args: any) => any
  public abstract getItem: (_id: string) => any
  public abstract getItems: () => any
}
