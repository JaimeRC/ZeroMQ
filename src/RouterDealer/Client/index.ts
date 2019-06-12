import * as zeromq from 'zeromq'
import { service } from '../service/service'
import Q from 'q'

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

    public getMessage() {
        let deferred = Q.defer();

        this.zmq.on('message', deferred.resolve);
        this.zmq.on('error', deferred.reject);

        return deferred.promise;
    }

    public disconection(): void {
        this.zmq.close()
    }
}