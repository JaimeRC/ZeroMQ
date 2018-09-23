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

    public sendMessage(msg: JSON): void {
        let query: string = JSON.stringify(msg)

        console.log("Client envia: " + query)

        this.zmq.send(query)
    }

    public getMessage(): Promise<JSON> {
        return new Promise((resolve, reject): void => {

            this.zmq.on('message', function (): void {

                var args = Array.apply(null, arguments)

                console.log(this.zmq.identity + " <- '" + args + "'");

                let response = JSON.parse(args.toString())

                resolve(response)
            })
        })
    }

    public disconection(): void {
        this.zmq.close()
    }
}