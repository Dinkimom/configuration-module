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
const objectAssignDeep = require(`object-assign-deep`)

@Controller('api/settings')
@ClassMiddleware([cors()])
export class SettingsController {
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

  @Get('item/:application_id/:user_id')
  private getItem(req: Request, res: Response) {
    const db = server.mongoClient.db('ConfigurationModule')
    const collection = db.collection('Applications')

    if (/^[0-9a-fA-F]{24}$/.test(req.params.application_id)) {
      collection.findOne(
        { _id: new ObjectId(req.params.application_id) },
        (err, application) => {
          if (err) return res.status(400).json({ err })

          if (application === null) return res.status(200).json(null)

          db.collection('Settings').findOne(
            {
              user_id: req.params.user_id,
              application_id: req.params.application_id,
            },
            (err, settings) => {
              if (err) return res.status(400).json({ err })

              if (settings === null) {
                settings = {
                  application_id: req.params.application_id,
                  user_id: req.params.user_id,
                  settings: {},
                }

                db.collection('Settings').insertOne(settings)
              }

              return res.status(200).json({
                ...settings,
                descriptionCode: application.descriptionCode,
                name: application.name,
              })
            },
          )
        },
      )
    } else {
      return res.status(200).json(null)
    }
  }

  @Put('item/:application_id/:user_id')
  private updateItem(req: Request, res: Response) {
    const db = server.mongoClient.db('ConfigurationModule')
    const collection = db.collection('Settings')

    collection.findOne(
      {
        user_id: req.params.user_id,
        application_id: req.params.application_id,
      },
      (err, result) => {
        if (err) return res.status(400).json({ err })

        if (result === null)
          return res
            .status(400)
            .json({ err: 'There is no element with requested parameters' })

        const newSettings = objectAssignDeep(result.settings, req.body)

        collection.updateOne(
          {
            user_id: req.params.user_id,
            application_id: req.params.application_id,
          },
          { $set: { settings: newSettings } },
          err => {
            if (err) return res.status(400).json({ err })

            return res.status(200).send()
          },
        )
      },
    )
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
