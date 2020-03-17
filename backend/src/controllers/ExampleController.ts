import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  ClassMiddleware,
} from '@overnightjs/core'
import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { MongoClient } from 'mongodb'
import { connectionString } from '../../config/db'
import { stringify } from 'querystring'
import * as cors from 'cors'

@Controller('api/applications')
@ClassMiddleware([cors()])
export class ExampleController {
  @Get('items')
  private getItems(req: Request, res: Response) {
    try {
      MongoClient.connect(connectionString, (err, client) => {
        if (err) throw err

        const db = client.db('ConfigurationModule')
        const collection = db.collection('Applications')

        collection.find().toArray((err, result) => {
          if (err) throw err

          return res.status(200).json({
            items: result,
          })
        })
      })
    } catch (err) {
      return res.status(400).json({ err })
    }
  }

  @Get('item/:_id')
  private getItem(req: Request, res: Response) {
    try {
      MongoClient.connect(connectionString, (err, client) => {
        if (err) throw err

        const db = client.db('ConfigurationModule')
        const collection = db.collection('Applications')

        collection.findOne({ _id: req.params._id }, (err, result) => {
          if (err) throw err

          return res.status(200).json({
            item: result,
          })
        })
      })
    } catch (err) {
      return res.status(400).json({ err })
    }
  }

  @Post('item')
  @Middleware([
    check('name', 'Name is a required field')
      .not()
      .isEmpty(),
    check('descriptionCode')
      .not()
      .isEmpty(),
  ])
  private addItem(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: {
          msg: 'Invalid form data',
          errors: errors.array(),
        },
      })
    }

    try {
      MongoClient.connect(connectionString, (err, client) => {
        if (err) throw err

        const db = client.db('ConfigurationModule')
        const collection = db.collection('Applications')

        collection.insertOne({ ...req.body }, (err, result) => {
          if (err) throw err

          return res.status(200).json({
            item: result,
          })
        })
      })
    } catch (err) {
      return res.status(400).json({
        error: {
          msg: stringify(err),
        },
      })
    }
  }

  @Delete('item/:_id')
  private deleteApplication(req: Request, res: Response) {
    try {
      MongoClient.connect(connectionString, (err, client) => {
        if (err) throw err

        const db = client.db('ConfigurationModule')
        const collection = db.collection('Applications')

        collection.deleteOne({ _id: req.params._id }, err => {
          if (err) throw err

          return res.status(200)
        })
      })
    } catch (err) {
      return res.status(400).json({ err })
    }
  }
}
