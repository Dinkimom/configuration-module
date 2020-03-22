"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const cors = require("cors");
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const start_1 = require("../start");
let ExampleController = class ExampleController {
    getItems(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentPage = Number(req.params.currentPage) | 0;
            const itemsPerPage = Number(req.params.itemsPerPage) | 50;
            const skips = Number(itemsPerPage) * (Number(currentPage) - 1);
            const db = start_1.server.mongoClient.db('ConfigurationModule');
            const collection = db.collection('Applications');
            let totalPages = yield Math.floor((yield collection.count()) / itemsPerPage);
            console.log(totalPages);
            collection
                .find()
                .skip(skips)
                .limit(itemsPerPage)
                .toArray((err, result) => {
                if (err)
                    return res.status(400).json({ error: err.message });
                return res.status(200).json({
                    items: result,
                    currentPage,
                    totalPages,
                });
            });
        });
    }
    getItem(req, res) {
        const db = start_1.server.mongoClient.db('ConfigurationModule');
        const collection = db.collection('Applications');
        if (/^[0-9a-fA-F]{24}$/.test(req.params._id)) {
            collection.findOne({ _id: new mongodb_1.ObjectId(req.params._id) }, (err, result) => {
                if (err)
                    return res.status(400).json({ err });
                return res.status(200).json(Object.assign({}, result));
            });
        }
        else {
            return res.status(200).json(null);
        }
    }
    updateItem(req, res) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: {
                    msg: 'Invalid form data',
                    errors: errors.array(),
                },
            });
        }
        const db = start_1.server.mongoClient.db('ConfigurationModule');
        const collection = db.collection('Applications');
        collection
            .find({
            _id: { $nin: [new mongodb_1.ObjectId(req.params._id)] },
            name: req.body.name,
        })
            .toArray((err, result) => {
            if (err)
                return res.status(400).json({ err });
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
                });
            }
            collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(req.params._id) }, { $set: Object.assign({}, req.body) }, {
                returnOriginal: false,
            }, (err, result) => {
                if (err)
                    return res.status(400).json({ err });
                return res.status(200).json(Object.assign({}, result.value));
            });
        });
    }
    addItem(req, res) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: {
                    msg: 'Invalid form data',
                    errors: errors.array(),
                },
            });
        }
        const db = start_1.server.mongoClient.db('ConfigurationModule');
        const collection = db.collection('Applications');
        collection.find({ name: req.body.name }).toArray((err, result) => {
            if (err)
                return res.status(400).json({ err });
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
                });
            }
            collection.insertOne(Object.assign({}, req.body), (err, result) => {
                if (err)
                    return res.status(400).json({ err });
                return res.status(200).json({
                    _id: result.insertedId,
                });
            });
        });
    }
    deleteApplication(req, res) {
        const db = start_1.server.mongoClient.db('ConfigurationModule');
        const collection = db.collection('Applications');
        if (/^[0-9a-fA-F]{24}$/.test(req.params._id)) {
            collection.deleteOne({ _id: new mongodb_1.ObjectId(req.params._id) }, err => {
                if (err)
                    return res.status(400).json({ err });
                return res.status(200);
            });
        }
        else {
            return res.status(400).json({
                error: {
                    msg: 'There is no application with requested id',
                },
            });
        }
    }
};
tslib_1.__decorate([
    core_1.Get('items'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExampleController.prototype, "getItems", null);
tslib_1.__decorate([
    core_1.Get('item/:_id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ExampleController.prototype, "getItem", null);
tslib_1.__decorate([
    core_1.Put('item/:_id'),
    core_1.Middleware([
        express_validator_1.check('name', 'Name is a required field')
            .not()
            .isEmpty(),
        express_validator_1.check('descriptionCode')
            .not()
            .isEmpty(),
    ]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ExampleController.prototype, "updateItem", null);
tslib_1.__decorate([
    core_1.Post('item'),
    core_1.Middleware([
        express_validator_1.check('name', 'Name is a required field')
            .not()
            .isEmpty(),
        express_validator_1.check('descriptionCode')
            .not()
            .isEmpty(),
    ]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ExampleController.prototype, "addItem", null);
tslib_1.__decorate([
    core_1.Delete('item/:_id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ExampleController.prototype, "deleteApplication", null);
ExampleController = tslib_1.__decorate([
    core_1.Controller('api/applications'),
    core_1.ClassMiddleware([cors()])
], ExampleController);
exports.ExampleController = ExampleController;
