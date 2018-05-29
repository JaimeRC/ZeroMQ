const utils = require('./utils')
require('../config/enviroment')

const uuidv4 = require('uuid/v4')

const zmq = require('zeromq'),
    rep = zmq.socket('req')

let identifyWorrker = uuidv4()
let response = "¿Que pasa compadre?"
let info = true

let num = 0

if (info) {
    console.log(`Worker (${identifyWorrker}) se ha conectado a tcp://${IP_BROKER}:${PORT_WORKER_BROKER}`)
    console.log(`Worker (${identifyWorrker}) ha confirmado la recepcion del mensaje: ${DISPO}`)
}

rep.identity = identifyWorrker
rep.connect(`tcp://${IP_BROKER}:${PORT_WORKER_BROKER}`)

rep.on("message", () => {
    let args = Array.apply(null, arguments)
console,log(args)
    if (info) {
        console.log(`Worker (${identifyWorrker}) ha recibido el mensaje: (${args[2]}) del Client (${args[0]}).`)
        utils.showArguments(args)
    }

    setTimeout(() => {
        if (info) {
            console.log(`Worker (${identifyWorrker}) ha enviado su respuest`)
            utils.showArguments([args[0], "", response]);
            console.log(`Worker (${identifyWorrker}) ha enviado ${++num} repuestas`)
        }
        rep.send([args[0], "", response])
    }, 3000)
})
