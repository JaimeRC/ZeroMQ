//const { getWorkers, clearArgs, showArguments } = require('./utils')
const utils = require('./utils')
require('../config/enviroment')

const zmq = require('zeromq'),
    frontend = zmq.socket('router'),
    backend = zmq.socket('router')

const WORKING = true
const workers = []
const info = true

if (info) {
    console.log("Broker:")
    console.log(`- frontend escuchando en tcp://${IP_BROKER}:${PORT_CLIENT_BROKER}...`)
    console.log(`- backend escuchando en tcp://${IP_BROKER}:${PORT_WORKER_BROKER}...`)
}

frontend.bindSync(`tcp://${IP_BROKER}:${PORT_CLIENT_BROKER}`)
backend.bindSync(`tcp://${IP_BROKER}:${PORT_WORKER_BROKER}`)

frontend.on("message", () => {
    let args = Array.apply(null, arguments)
    let worker = utils.getWorkers(workers)

    console.log(args)
    if (info) {
        console.log(`Recibe mensaje: ${args[2]} del cliente (${args[0]})`)
        utils.showArguments(args)
    }

    if (worker == null) {
        console.log("No hay Workers")
        frontend.send([args[0], "", "No hay Workers"])
        return
    }

    if (info) {
        console.log(`Enviando Client: (${args[2]}) req a Worker (${worker}) al backend`)
        utils.showArguments(args)
    }

    worker[worker][0] = WORKING
    worker[worker][1] += 1
    backend.send([worker, "", args])

})

backend.on("message", () => {
    let args = Array.apply(null, arguments)

    if (workers[args[0]] == undefined) {
        workers[args[0]] = [!WORKING, 0]

        if (info) {
            console.log(`Recibiendo respuesta: (${args[2]}) del Worker (${args[0]})`);
            utils.showArguments(args);
        }

    } else {

        workers[args[0]][0] = !WORKING;

        if (info) {
            console.log(`Recibiendo respuesta: (${args[2]}) del Worker (${args[0]})`);
            utils.showArguments(args);
        }
    }

    if (args[2] != "READY") {
        console.log(`ENviando Worker: (${args[0]}) rep al Client (${args[2]}) al backend`);
        args = clearArgs(args);
        utils.showArguments(args);

        frontend.send([args[0], "", args[2]]);
    }
    console.log(workers);
})