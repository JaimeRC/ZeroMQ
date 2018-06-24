require('dotenv').config();
const port = process.env.PORT_EXPRESS

import proxy from './Proxy'
import pullpush from './PullPush'

import express from 'express'
import * as bodyParser from 'body-parser'

const app: express.Express = express(),
    jsonBodyParser = bodyParser.json();

app.post('/example/proxy', jsonBodyParser, proxy)

app.post('/example/pullpush', jsonBodyParser, pullpush)

app.listen(port, () => { console.log(`Server running in port ${port}`) })  