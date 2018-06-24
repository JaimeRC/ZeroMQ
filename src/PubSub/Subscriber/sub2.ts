require('dotenv').config()
import * as zmq from 'zeromq'

const HOST: string = process.env.HOST,
    PORT_PUB_SUB: string = process.env.PORT_PUB_SUB,
    sub = zmq.socket('sub'),
    ip: string = `tcp://${HOST}:${PORT_PUB_SUB}`,
    channel: string = 'PubSub'

export = {

    conection(): any {
        sub.connect(ip)
        sub.subscribe(channel)
    },

    getMessage(): any {
        sub.on('message', function (msg: Buffer) {
            console.log('Subcrite2 recibido: ' + msg.toString())
        })
    }
}