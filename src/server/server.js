const express = require('express');
const app = express();
const routers = require('../micro-services-routers');
const bodyParser = require('body-parser');
const connect = require('../config/db/mongoose');


const gatewayRoutes = require('../api/controllers/gateway.controller');

function bootstrap(port, dbHost, dbName) {
    return new Promise(async (resolve, reject) => {
        const dbInstance = await connect(dbHost, dbName);

        app.use('/', (req, res, next) => {

            let contype = req.headers['content-type'];
            if (contype && !((contype.includes('application/json') || contype.includes('multipart/form-data'))))
                return res.status(415).send({ error: 'Unsupported Media Type (' + contype + ')' });

            next();
        });

        app.use(bodyParser.json({ limit: '100mb' }));
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE, OPTIONS');
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            next();
        });

        app.use(gatewayRoutes);
        app.use('/api', routers);


        app.use((err, req, res, next) => {
            console.log("$$$$ err $$$$", err);
        })

        process.on('uncaughtException', (err) => {
            console.log(">>>> err >>>> ", err);
        });

        process.on('unhandledRejection', (err) => {
            console.log(">>> .... err .... >>>>", err);
        })

        const server = app.listen(port, () => {
            console.log(`.... Api-Gateway server started on port ${port} ....`)

        })

        resolve(server);
    })
}

module.exports = bootstrap;
