import { Request, Response } from 'express';
import { client } from '../database';
import { QueryConfig } from 'pg';


const deleteProject =async (req:Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)

    const queryString: string = `
        DELETE FROM
            projects
        WHERE
            id = $1
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    await client.query(queryConfig)

    return res.status(204).send()
}

export default deleteProject