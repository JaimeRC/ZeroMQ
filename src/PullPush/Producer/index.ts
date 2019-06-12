require('dotenv').config()
import * as zmq from 'zeromq'
const HOST: string = process.env.HOST,
    PORT_PULL_PUSH: string = process.env.PORT_PULL_PUSH

interface SocketPush {
    connection(): void
    sendMessage(msg: string): void
    disconnection(): void
}

export default class Push implements SocketPush {

    private push: any
    private ip: string

    constructor() {
        this.push = zmq.socket('push')
        this.ip = `tcp://${HOST}:${PORT_PULL_PUSH}`
    }
    connection() {
        this.push.bindSync(this.ip)
    }
    sendMessage(msg: string) {
        console.log('SocketPush enviando: ' + msg.toString())
        this.push.send(msg)
    }
    disconnection() {
        this.push.close()
    }

}

/*
const Push = function (): SocketPush {
    const HOST: string = process.env.HOST
    const PORT_PULL_PUSH: string = process.env.PORT_PULL_PUSH

    const push = zmq.socket('push')
    const ip: string = `tcp://${HOST}:${PORT_PULL_PUSH}`

    return {
        connection: function () {
            push.bindSync(ip)
        },
        sendMessage: function (msg: string) {
            console.log('SocketPush enviando: ' + msg.toString())
            push.send(msg)
        },
        disconnection: function () {
            push.close()
        }
    }
}
*/
