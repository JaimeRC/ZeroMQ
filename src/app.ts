require('dotenv').config();
const port = process.env.PORT_EXPRESS

import proxy from './Proxy/index'
import pullpush from './PullPush'

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    jsonBodyParser = bodyParser.json();

app.post('/example/proxy', jsonBodyParser, proxy)

app.post('/example/pullpush', jsonBodyParser, pullpush)

app.listen(port, () => { console.log(`Server running in port ${port}`) })  