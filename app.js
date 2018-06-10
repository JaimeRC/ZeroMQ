require('dotenv').config()
const port = process.env.PORT_EXPRESS

const proxy = require('./Proxy/index')

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jsonBodyParser = bodyParser.json();

app.post('/example/proxy', jsonBodyParser, proxy)

app.listen(port, () => { console.log(`Server running in port ${port}`) })  