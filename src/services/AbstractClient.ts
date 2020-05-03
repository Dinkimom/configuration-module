/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { serverEntryPoint } from '../shared/constants/serverEntryPoint'
import { RequestsEnum } from '../shared/enums/RequestsEnum'
import { Entity } from '../shared/types/Entity'
import { notificationSystem } from '../app/app'

export abstract class AbstractClient {
  public entity: Entity
  public URL: string
  public axios = axios.create({ timeout: 20000 })

  public abstract add: (...args: any) => any
  public abstract update: (...args: any) => any
  public abstract delete: (...args: any) => any
  public abstract getItem: (...args: any) => any
  public abstract getItems: (...args: any) => any

  public constructor(entity: Entity) {
    this.entity = entity
    this.URL = `${serverEntryPoint}${this.entity}`
  }

  public helper = (
    request: RequestsEnum,
    data: {
      _id?: string
      body?: any
    } = {},
    params: {
      [key: string]: any
    } = {},
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
          params: { ...params },
        }
      default:
        return {} as AxiosRequestConfig
    }
  }

  public errorHandler = (error: AxiosError): AxiosResponse | AxiosError => {
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      return error.response
    }

    if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request)
      notificationSystem.current.addNotification({
        position: 'tc',
        message: error.message,
        level: 'error',
      })
      return {
        data: {
          error: error.message,
        },
      } as AxiosResponse
    }
    // Something happened in setting up the request and triggered an Error
    console.log('Error', error.message)

    return error
  }
}
