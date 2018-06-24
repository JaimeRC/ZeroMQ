require('dotenv').config()
import * as zmq from 'zeromq'

const { env: { HOST, PORT_WORKER_BROKER, DISPO } } = process

const ipWorker: string = `tcp://${HOST}:${PORT_WORKER_BROKER}`
let worker: any;

export = {

    conection(): any {
        worker = zmq.socket('req')
        worker.identity = 'worker_proxy' + process.pid
        worker.connect(ipWorker)

        this.sendMessage(DISPO)
    },

    sendMessage(msg: string) {
        worker.send(msg)
    },

    getMessage(): any {
        worker.on('message', function (...buffer: Array<Buffer>) {
            console.log(buffer)

            let idWorker: Buffer = buffer[0],
                empty0: Buffer = buffer[1],
                idClient: Buffer = buffer[2],
                empty1: Buffer = buffer[3],
                query: Buffer = buffer[4]

            let msg = JSON.parse(query.toString())

            if (msg.request === "¿Hola Pajarito?") {
                msg.response = "Pio Pio"
                msg.status = "OK"
            } else {
                msg.response = "Muuuuuu"
                msg.status = "KO"
            }

            let response: string = JSON.stringify(msg)

            console.log(idWorker)

            this.sendMessage([idClient, empty0, response])
        })
    }
}