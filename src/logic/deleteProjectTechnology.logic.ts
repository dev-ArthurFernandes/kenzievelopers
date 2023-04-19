import { Request, Response } from "express";
import { client } from "../database";


const deleteProjectTechnology =async (req:Request, res: Response): Promise<Response> => {
    
    const projectId: number = parseInt(req.params.id)

    const techName: string = req.params.name

    var queryString: string = `
        SELECT
            *
        FROM
            technologies
        WHERE
            name = ${techName}
    `

    const techId: number = (await client.query(queryString)).rows[0].id

    

    return res.status(204).send()
}