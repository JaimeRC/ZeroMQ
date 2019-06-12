require('dotenv').config()
import * as zmq from 'zeromq'
import { Worker } from '../Worker'

const { env: { HOST, PORT_CLIENT_BROKER, PORT_WORKER_BROKER } } = process,
    ipBrokerClient: string = `tcp://${HOST}:${PORT_CLIENT_BROKER}`,
    ipBrokerWorker: string = `tcp://${HOST}:${PORT_WORKER_BROKER}`,
    idWorker: string = `worker_proxy_${process.pid}`

let frontend = zmq.socket('router'),
    backend = zmq.socket('dealer')

export = {

    loadFrontend(): void {
        frontend.identity = `frontend_proxy${process.pid}`
        frontend.bind(ipBrokerClient, function (err: string) {
            if (err) throw err

            console.log("Frontend en escucha: " + frontend.identity)

            frontend.on('message', function (): void {
                var args = Array.apply(null, arguments)
                console.log("datos frontend", args)
                backend.send(args)
            })
        })
    },

    loadBackend(): void {
        backend = zmq.socket('router')
        backend.identity = `backend_proxy${process.pid}`
        backend.bind(ipBrokerWorker, function (err: string): void {
            if (err) throw err

            console.log("Backend en escucha: " + backend.identity)

            backend.on('message', function () {
                var args = Array.apply(null, arguments)
                console.log("datos backend", args)
                frontend.send(args)
            })
        })
    },

    loadBroker(): void {
        this.loadFrontend()
        this.loadBackend()

        setTimeout(() => new Worker(idWorker, ipBrokerWorker).conection(), 10)
    }
}  