import axios, { AxiosResponse, AxiosError } from 'axios'
import { RequestsEnum } from '../shared/enums/RequestsEnum'
import { IApplicationDTO } from '../shared/types/IApplicationDTO'
import { AbstractClient } from './AbstractClient'

export class ApplicationsClient extends AbstractClient {
  constructor() {
    super('applications')
  }

  public add = async (
    body: IApplicationDTO,
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      return await axios(this.helper(RequestsEnum.add, { body }))
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public update = async (
    data: IApplicationDTO,
  ): Promise<AxiosResponse | AxiosError> => {
    const { _id, ...body } = data

    try {
      return await this.axios(this.helper(RequestsEnum.update, { _id, body }))
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public delete = async (_id: string): Promise<AxiosResponse | AxiosError> => {
    try {
      return await this.axios(this.helper(RequestsEnum.delete, { _id }))
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public getItem = async (_id: string): Promise<AxiosResponse | AxiosError> => {
    try {
      return await this.axios(this.helper(RequestsEnum.getItem, { _id }))
    } catch (error) {
      return this.errorHandler(error)
    }
  }

  public getItems = async (params?: {
    currentPage: number
  }): Promise<AxiosResponse | AxiosError> => {
    try {
      return await this.axios(this.helper(RequestsEnum.getItems, {}, params))
    } catch (error) {
      return this.errorHandler(error)
    }
  }
}
