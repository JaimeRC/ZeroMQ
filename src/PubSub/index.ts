import { Request, Response } from 'express'
import pub from './Publisher'

export = (req: Request,res:Response) =>{

    const {body} = req

    pub.conection()

    pub.sendMessage(body)

}