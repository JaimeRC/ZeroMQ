import * as zeromq from 'zeromq'
import { service } from '../service/service';

export class Client implements service {
    private zmq: any
    private id: string
    private ipClient: string
    private msg: JSON

    constructor(id: string, ipClient: string, msg: JSON) {
        this.id = id
        this.ipClient = ipClient
        this.msg = msg
    }

    conection(): void {
        this.zmq = zeromq.socket('req')
        this.zmq.connect(this.ipClient)
        this.zmq.identity = this.id
    }

    sendMessage(): void {
        this.conection()

        let query: string = JSON.stringify(this.msg)

        console.log("Client: " + query)

        this.zmq.send(query)
    }

    getMessage(): Promise<JSON> {
        return new Promise((resolve, reject): void => {

            this.zmq.on('message', function (...buffer: Array<Buffer>): void {

                console.log(this.zmq.identity + " <- '" + buffer + "'");

                let response = JSON.parse(buffer.toString())

                resolve(response)
            })
        })
    }

    disconection(): void {
        this.zmq.close()
    }
}