require('dotenv').config()
const PORT = process.env.PORT_EXPRESS

//import ReqRep from './ReqRep'
import PubSub from './PubSub'
import RouterDealer from './RouterDealer'
import RouterDealerBroker from './RouterDealer/Broker'
import RouterRouter from './Proxy'
import RouterRouterBroker from './Proxy/Broker'

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jsonBodyParser = bodyParser.json()

//app.post('/example/reqrep', jsonBodyParser, ReqRep)


app.post('/example/pubsub', jsonBodyParser, PubSub)

app.post('/example/proxy', jsonBodyParser, RouterRouter)

app.post('/example/routerdealer', jsonBodyParser, RouterDealer)

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
    RouterRouterBroker.loadBroker()
    RouterDealerBroker.loadBroker()
})  