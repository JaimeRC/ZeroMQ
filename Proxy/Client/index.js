require('../config/enviroment')
const uuidv4 = require('uuid/v4')

const zmq = require('zeromq')
    , req = zmq.socket('req');

let identifyClient = uuidv4();
let message = "¿Hola Caracola?"

req.identity = identifyClient;

req.connect(`tcp://${IP_BROKER}:${PORT_CLIENT_BROKER}`);

console.log(`Cliente (${identifyClient}) conectado a tcp://${IP_BROKER}:${PORT_CLIENT_BROKER}`)

req.on("message", (msg) => {
    console.log(`Cliente (${identifyClient}) ha recibido respuesta: ${msg}`)

    req.close()
    process.exit(0)
})

console.log(`Cliente (${identifyClient}) ha enviado el mensaje: ${message}`)
req.send(message)
