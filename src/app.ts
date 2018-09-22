require('dotenv').config();
const PORT = process.env.PORT_EXPRESS

import ReqRep from './ReqRep'
import PullPush from './PullPush'
import PubSub from './PubSub'
import RouterDealer from './RouterDealer'
import RouterDealerBroker from './RouterDealer/Broker'
import Proxy from './Proxy'
import ProxyBroker from './Proxy/Broker'

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    jsonBodyParser = bodyParser.json()

    
app.post('/example/reqrep', jsonBodyParser, ReqRep)

app.post('/example/pullpush', jsonBodyParser, PullPush)

app.post('/example/pubsub', jsonBodyParser, PubSub)


app.post('/example/proxy', jsonBodyParser, Proxy)

app.post('/example/routerdealer', jsonBodyParser, RouterDealer)

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
   // ProxyBroker.loadBroker()
    RouterDealerBroker.loadBroker()
})  