require('dotenv').config();
import { Request, Response } from 'express'
import { Client } from './Client'

const { env: { HOST, PORT_CLIENT_BROKER } } = process,
    idClient: string = `client_proxy_${process.pid}`,
    ipClient: string = `tcp://${HOST}:${PORT_CLIENT_BROKER}`

export = (req: Request, res: Response): void => {

    const { body } = req;

    let client = new Client(idClient, ipClient)

    client.conection()

 client.sendMessage(body)

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

