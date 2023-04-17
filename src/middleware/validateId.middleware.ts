import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { QueryConfig } from "pg";


const validateId = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {

    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM
            developers
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: boolean = (await client.query(queryConfig)).rowCount? true : false

    if(!queryResult){
        return res.status(404).json({
            message: "Developer not found."
        })
    }

    return next()
}

export default validateId