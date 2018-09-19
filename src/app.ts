require('dotenv').config();
const port = process.env.PORT_EXPRESS

import proxy from './Proxy'
import pullpush from './PullPush'
import pubsub from './PubSub'

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    jsonBodyParser = bodyParser.json()

app.post('/example/proxy', jsonBodyParser, proxy)

app.post('/example/pullpush', jsonBodyParser, pullpush)

app.post('/example/pubsub', jsonBodyParser, pubsub)

app.listen(port, () => { console.log(`Server running in port ${port}`) })  