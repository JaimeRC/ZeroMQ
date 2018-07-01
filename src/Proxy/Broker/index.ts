require('dotenv').config()
import * as zmq from 'zeromq'

const { env: { HOST_BROKER, PORT_CLIENT_BROKER, PORT_WORKER_BROKER } } = process,
    ipClient: string = `tcp://${HOST_BROKER}:${PORT_CLIENT_BROKER}`,
    ipWorker: string = `tcp://${HOST_BROKER}:${PORT_WORKER_BROKER}`

let frontend: any,
    backend: any

let workers: Array<string> = []

export = {

    loadFrontend(): void {
        frontend = zmq.socket('router')
        frontend.identity = 'frontend_proxy' + process.pid
        frontend.bind(ipClient, function (err: Error) {
            if (err) throw err;

            console.log("Frontend en escucha: " + frontend.identity)

            frontend.on('message', function (...buffer: Array<Buffer>): void {

                let idClient: Buffer = buffer[0],
                    empty: Buffer = buffer[1],
                    query: Buffer = buffer[2]

                let interval = setInterval(function (): void {

                    if (workers.length > 0) {
                        console.log("Frontend envia: " + query)
                        backend.send([workers.shift(), '', idClient, '', query])
                        clearInterval(interval)
                    }

                }, 10)
            });
        });
    },

    loadBackend(): void {
        backend = zmq.socket('router')
        backend.identity = 'backend_proxy' + process.pid
        backend.bind(ipWorker, function (err: Error): void {
            if (err) throw err;

            console.log("Backend en escucha: " + backend.identity)

            backend.on('message', function (...buffer: Array<Buffer>) {

                let idWorker: Buffer = buffer[0],
                    empty0: Buffer = buffer[1],
                    idClient: Buffer = buffer[2],
                    empty1: Buffer = buffer[3],
                    query: Buffer = buffer[4]

                workers.push(idClient.toString())

                console.log("Worker disponible: " + idClient)
                frontend.send("HOLA")

                if (workers[0] != "READY") {
                    frontend.send([idClient, empty0, query])
                }
            })
        })
    },

    loadBroker(): void {
        this.loadFrontend();
        this.loadBackend();
    }
}  