import { Request, Response, NextFunction } from "express";
import { client } from "../database";


const verifyTech =async (req:Request, res: Response, next: NextFunction): Promise<void | Response> => {

    const projetcId: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM
            projects_technologies
        WHERE
            "projectId" = ${projetcId}
    `

    const queryResult: boolean = (await client.query(queryString)).rowCount? true : false

    if(queryResult){
        return res.status(409).json({
            "message": "This technology is already associated with the project"
        })
    }

    return next()

}

export default verifyTech