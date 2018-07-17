require('dotenv').config()
import * as zmq from 'zeromq'

const HOST: string = process.env.HOST
const PORT_PULL_PUSH: string = process.env.PORT_PULL_PUSH

const pull = zmq.socket('pull')
const ip: string = `tcp://${HOST}:${PORT_PULL_PUSH}`

export = {

    conection(): void {
        pull.connect(ip)
    },

    getMessage(): void {
        pull.on('message', function (msg: Buffer): void {
            console.log('Worker recibido: ' + msg.toString())
        })
    }
}