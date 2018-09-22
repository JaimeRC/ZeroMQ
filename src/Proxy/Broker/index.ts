require('dotenv').config()
import * as zmq from 'zeromq'
import { Worker } from '../Worker/index'

const { env: { HOST, PORT_CLIENT_BROKER, PORT_WORKER_BROKER } } = process,
    ipBrokerClient: string = `tcp://${HOST}:${PORT_CLIENT_BROKER}`,
    ipBrokerWorker: string = `tcp://${HOST}:${PORT_WORKER_BROKER}`,
    idWorker: string = `worker_proxy_${process.pid}`

let frontend= zmq.socket('router'),
    backend= zmq.socket('router')

let workers: Array<string> = []

export = {

    loadFrontend(): void {
        frontend.identity = 'frontend_proxy' + process.pid
        frontend.bind(ipBrokerClient, function (err: string) {
            if (err) throw err

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
            })
        })
    },

    loadBackend(): void {
        backend = zmq.socket('router')
        backend.identity = 'backend_proxy' + process.pid
        backend.bind(ipBrokerWorker, function (err: string): void {
            if (err) throw err

            console.log("Backend en escucha: " + backend.identity)

            backend.on('message', function (...buffer: Array<Buffer>) {
                console.log(buffer)
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
        this.loadFrontend()
        this.loadBackend()

        setTimeout(() => new Worker(idWorker, ipBrokerWorker).conection(), 10)
    }
}  