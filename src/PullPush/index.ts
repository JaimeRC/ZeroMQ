import { Request, Response } from 'express'

import push from './Producer'
import pull from './Worker'

export = (req: Request, res: Response) => {

    const { body } = req

    push.conection()
    pull.conection()

    push.sendMessage(body)
}