import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Middleware,
} from '@overnightjs/core'
import { Logger } from '@overnightjs/logger'
import { Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import { connectionString } from '../../config/db'
import { check, validationResult } from 'express-validator'

@Controller('api/applications')
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
    check('defaultSettings')
      .not()
      .isEmpty(),
  ])
  private addItem(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
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
      return res.status(400).json({ err })
    }
  }

  @Delete(':msg')
  private delMessage(req: Request, res: Response) {
    try {
      throw new Error(req.params.msg)
    } catch (err) {
      Logger.Err(err, true)
      return res.status(400).json({
        error: req.params.msg,
      })
    }
  }
}
