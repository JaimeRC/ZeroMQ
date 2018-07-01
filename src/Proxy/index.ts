require('dotenv').config();
import { Request, Response } from 'express'
import { Client } from './Client/index'
import broker = require('./Broker/index')
import { Worker } from './Worker/index'

const { env: { HOST, PORT_CLIENT_BROKER, PORT_WORKER_BROKER } } = process,
    idClient: string = `client_proxy_${process.pid}`,
    ipClient: string = `tcp://${HOST}:${PORT_CLIENT_BROKER}`,
    idWorker: string = `worker_proxy_${process.pid}`,
    ipWorker: string = `tcp://${HOST}:${PORT_WORKER_BROKER}`

export = (req: Request, res: Response): void => {

    const { body } = req;

    broker.loadBroker()

    let client = new Client(idClient, ipClient, body)
    let worker = new Worker(idWorker, ipWorker)

    setTimeout((): void => {
        worker.conection()
        client.conection()
        client.sendMessage()
    }, 10)

    client.getMessage()
        .then((data: JSON): void => {

            res.statusCode = 200;
            res.json(data)

            client.disconection()
        })
        .catch((err: Error): void => {
            res.statusCode = 500
            res.json(err)
        })

}