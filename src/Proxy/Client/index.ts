require('dotenv').config()
import * as zmq from 'zeromq'

const { env: { HOST, PORT_CLIENT_BROKER } } = process

const ipClient: string = `tcp://${HOST}:${PORT_CLIENT_BROKER}`

let req: any;

export = {

    conection(): any {
        req = zmq.socket('req')
        req.connect(ipClient)
        req.identity = 'client_proxy' + process.pid
    },

    sendMessage(msg: JSON): any {
        this.conection();

        let query: string = JSON.stringify(msg)

        console.log("Client: " + query)

        req.send(query)
    },

    getMessage(): any {
        return new Promise((resolve, reject) => {
            req.on('message', function (...buffer: Array<Buffer>): any {
                console.log(req.identity + " <- '" + buffer + "'");

                let response = JSON.parse(buffer.toString())

                resolve(response)
            })
        })
    },

    disconection(): any {
        req.close()
    }
}