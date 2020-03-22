"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const bodyParser = require("body-parser");
const controllers = require("./controllers");
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
class ExampleServer extends core_1.Server {
    constructor() {
        super(true);
        this.SERVER_STARTED = 'Example server started on port: ';
        this.mongoClient = new mongodb_1.MongoClient(db_1.connectionString);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
        this.setupMongoClient();
    }
    setupMongoClient() {
        return this.mongoClient.connect((err, client) => {
            if (err)
                return console.log(err);
            this.mongoClient = client;
        });
    }
    setupControllers() {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = controllers[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }
    start(port) {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            logger_1.Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}
exports.default = ExampleServer;
