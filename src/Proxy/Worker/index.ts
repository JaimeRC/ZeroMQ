import zeromq from 'zeromq'
import { service } from '../service/service';

export class Worker implements service {
    private zmq: any
    private id: string
    private ipWorker: string
    private DISPO: string = 'READY'

    constructor(id: string, ipWorker: string) {
        this.id = id;
        this.ipWorker = ipWorker
    }

    conection(): void {
        this.zmq = zeromq.socket('req')
        this.zmq.identity = this.id
        this.zmq.connect(this.ipWorker)

        this.sendMessage(this.DISPO)
    }

    sendMessage(msg: string): void {
        this.zmq.send(msg)
    }

    getMessage(): void {

        this.zmq.on('message', function (...buffer: Array<Buffer>): void {
            console.log(buffer)

            let idWorker: Buffer = buffer[0],
                empty0: Buffer = buffer[1],
                idClient: Buffer = buffer[2],
                empty1: Buffer = buffer[3],
                query: Buffer = buffer[4]

            let msg = JSON.parse(query.toString())

            if (msg.request === "¿Hola Pajarito?") {
                msg.response = "Pio Pio"
                msg.status = "OK"
            } else {
                msg.response = "Muuuuuu"
                msg.status = "KO"
            }

            let response: string = JSON.stringify(msg)

            console.log(idWorker)

            this.sendMessage([idClient, empty0, response])
        })
    }

    disconection() {
      //  this.zmq.disconection()
    }
}