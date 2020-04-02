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
                  settings: application.defaultSettings,
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
}
