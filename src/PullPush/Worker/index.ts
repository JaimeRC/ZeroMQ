require('dotenv').config()
import * as zmq from 'zeromq'

const HOST: string = process.env.HOST
const PORT_PULL_PUSH: string = process.env.PORT_PULL_PUSH

const pull = zmq.socket('pull')
const ip: string = `tcp://${HOST}:${PORT_PULL_PUSH}`

export = {

    conection(): any {
        pull.connect(ip)
    },

    getMessage(): any {
        pull.on('message', function (msg: Buffer) {
            console.log('Worker recibido: ' + msg.toString())
        })
    }
}