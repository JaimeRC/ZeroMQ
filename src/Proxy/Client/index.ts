import * as zeromq from 'zeromq'
import { service } from '../service/service';

export class Client implements service {
    private zmq: any
    private id: string
    private ipClient: string

    constructor(id: string, ipClient: string) {
        this.id = id
        this.ipClient = ipClient
    }

    public conection(): void {
        this.zmq = zeromq.socket('req')
        this.zmq.connect(this.ipClient)
        this.zmq.identity = this.id
    }

    public sendMessage(msg:JSON): void {
        this.conection()

        let query: string = JSON.stringify(msg)

        console.log("Client: " + query)

        this.zmq.send(query)
    }

    public getMessage(): Promise<JSON> {
        return new Promise((resolve, reject): void => {

            this.zmq.on('message', function (...buffer: Array<Buffer>): void {

                console.log(this.zmq.identity + " <- '" + buffer + "'");

                let response = JSON.parse(buffer.toString())

                resolve(response)
            })
        })
    }

    public disconection(): void {
        this.zmq.close()
    }
}