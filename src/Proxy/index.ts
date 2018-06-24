import { Request, Response } from 'express'
import client from './Client/index'
import broker from './Broker/index'
import worker from './Worker/index'

export = (req: Request, res: Response) => {

    const { body } = req;

    broker.loadBroker()

    setTimeout((): any => {
        worker.conection()
        client.sendMessage(body)
    }, 10)

    client.getMessage()
        .then((data: JSON): any => {

            res.statusCode = 200;
            res.json(data)

            client.disconection()
        })
        .catch((err: any): any => {
            res.statusCode = 500
            res.json(err)
        })

}