require('dotenv').config()
import * as zmq from 'zeromq'
const HOST: string = process.env.HOST
const PORT_PULL_PUSH: string = process.env.PORT_PULL_PUSH


export default class Pull {

    private pull: any
    private ip: string

    constructor() {
        this.pull = zmq.socket('push')
        this.ip = `tcp://${HOST}:${PORT_PULL_PUSH}`

    }

    connection() {
        this.pull.bindSync(this.ip)
    }

    getMessage(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.pull.on('message', function (...msg: Buffer[]): void {
                console.log('SocketPull recibido: ' + msg.toString())
                resolve('SocketPull recibido: ' + msg.toString())
            })
            this.pull.on('error', function (error:Error): void {
                reject(error)
            })
        })
    }

    disconnection() {
        this.pull.close()
    }

}



/*
let Pull = function (): SocketPull {
    const HOST: string = process.env.HOST
    const PORT_PULL_PUSH: string = process.env.PORT_PULL_PUSH

    const pull: zmq.Socket = zmq.socket('pull')
    const ip: string = `tcp://${HOST}:${PORT_PULL_PUSH}`

    return {
        connection: function (): void {
            pull.connect(ip)
        },
        getMessage: function (): Promise<string> {
            return new Promise((resolve, reject) => {
                pull.on('message', function (...msg: Buffer[]): void {
                    console.log('SocketPull recibido: ' + msg.toString())
                    resolve('SocketPull recibido: ' + msg.toString())
                })
                pull.on('error', function (error): void {
                    reject(error)
                })
            })
        },
        disconnection: function ():void {
            pull.close()
        }
    }
}

export = Pull()

*/