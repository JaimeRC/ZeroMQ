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

    public conection(): void {
        this.zmq = zeromq.socket('rep')
        this.zmq.identity = this.id
        this.zmq.connect(this.ipWorker)

        console.log('Worker en espera...')
        this.sendMessage(this.DISPO)
    }

    public sendMessage(msg: string): void {
        this.zmq.send(msg)
    }

    public getMessage(): void {

        this.zmq.on('message', function (): void {

                var args = Array.apply(null, arguments)
                console.log("datos worker", args[4])

            let msg = JSON.parse(args[4].toString())

            if (msg.request === "¿Hola Pajarito?") {
                msg.response = "Pio Pio"
                msg.status = "OK"
            } else {
                msg.response = "Muuuuuu"
                msg.status = "KO"
            }

            let response: string = JSON.stringify(msg)

            this.sendMessage(response)
        })
    }

    public disconection() {
      //  this.zmq.disconection()
    }
}