import { Request, Response, NextFunction, query } from 'express';
import { client } from '../database';
import { QueryConfig } from 'pg';

const validateId = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    
    const id: number = parseInt(req.params.id)

    var table: string[] = req.url.split('/')

    const queryString: string = `
        SELECT
            *
        FROM 
            ${table[1]}
        WHERE
            id = $1;
    `

    const querConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: boolean = (await client.query(querConfig)).rowCount? true : false

    if(!queryResult){
        if(table[1] === "developers"){
            return res.status(404).json({
                message: "Developer not found."
            })
        }else{
            return res.status(404).json({
                message: "Project not found."
            })
        }
    }

    return next()
}

export default validateId