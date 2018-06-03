const proxy = require('./Proxy/index')

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jsonBodyParser = bodyParser.json();


app.post('/example/proxy', jsonBodyParser, proxy)

app.listen(PORT_EXPRESS, () =>{
    console.log(`Server running in port ${PORT_EXPRESS}`)
} ) 