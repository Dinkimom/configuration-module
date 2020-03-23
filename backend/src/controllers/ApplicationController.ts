import {
  ClassMiddleware,
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  Put,
} from '@overnightjs/core'
import * as cors from 'cors'
import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import { server } from '../start'

@Controller('api/applications')
@ClassMiddleware([cors()])
export class ApplicationsController {
  @Get('items/:currentPage?/:itemsPerPage?')
  private async getItems(req: Request, res: Response) {
    const currentPage = req.query.currentPage || 1
    const itemsPerPage = req.query.itemsPerPage || 10

    const skips = itemsPerPage * (currentPage - 1)

    const db = server.mongoClient.db('ConfigurationModule')
    const collection = db.collection('Applications')
    const count = await collection.count()

    let totalPages = Math.ceil(count / itemsPerPage)

    collection
      .find()
      .skip(skips)
      .limit(itemsPerPage)
      .toArray((err, result) => {
        if (err) return res.status(400).json({ error: err.message })

        return res.status(200).json({
          items: result,
          currentPage,
          totalPages,
        })
      })
  }

  @Get('item/:_id')
  private getItem(req: Request, res: Response) {
    const db = server.mongoClient.db('ConfigurationModule')
    const collection = db.collection('Applications')

    if (/^[0-9a-fA-F]{24}$/.test(req.params._id)) {
      collection.findOne(
        { _id: new ObjectId(req.params._id) },
        (err, result) => {
          if (err) return res.status(400).json({ err })

          return res.status(200).json({
            ...result,
          })
        },
      )
    } else {
      return res.status(200).json(null)
    }
  }

  @Put('item/:_id')
  @Middleware([
    check('name', 'Name is a required field')
      .not()
      .isEmpty(),
    check('descriptionCode')
      .not()
      .isEmpty(),
  ])
  private updateItem(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: {
          msg: 'Invalid form data',
          errors: errors.array(),
        },
      })
    }

    const db = server.mongoClient.db('ConfigurationModule')
    const collection = db.collection('Applications')

    collection
      .find({
        _id: { $nin: [new ObjectId(req.params._id)] },
        name: req.body.name,
      })
      .toArray((err, result) => {
        if (err) return res.status(400).json({ err })

        if (result.length > 0) {
          return res.status(400).json({
            error: {
              msg: 'Name must be unique',
              errors: [
                {
                  param: 'name',
                },
              ],
            },
          })
        }

        collection.findOneAndUpdate(
          { _id: new ObjectId(req.params._id) },
          { $set: { ...req.body } },
          {
            returnOriginal: false,
          },
          (err, result) => {
            if (err) return res.status(400).json({ err })

            return res.status(200).json({
              ...result.value,
            })
          },
        )
      })
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

    const db = server.mongoClient.db('ConfigurationModule')
    const collection = db.collection('Applications')

    collection.find({ name: req.body.name }).toArray((err, result) => {
      if (err) return res.status(400).json({ err })

      if (result.length > 0) {
        return res.status(400).json({
          error: {
            msg: 'Name must be unique',
            errors: [
              {
                param: 'name',
              },
            ],
          },
        })
      }

      collection.insertOne({ ...req.body }, (err, result) => {
        if (err) return res.status(400).json({ err })

        return res.status(200).json({
          _id: result.insertedId,
        })
      })
    })
  }

  @Delete('item/:_id')
  private deleteApplication(req: Request, res: Response) {
    const db = server.mongoClient.db('ConfigurationModule')
    const collection = db.collection('Applications')

    if (/^[0-9a-fA-F]{24}$/.test(req.params._id)) {
      collection.deleteOne({ _id: new ObjectId(req.params._id) }, err => {
        if (err) return res.status(400).json({ err })

        this.getItems(req, res)
      })
    } else {
      return res.status(400).json({
        error: {
          msg: 'There is no application with requested id',
        },
      })
    }
  }
}
