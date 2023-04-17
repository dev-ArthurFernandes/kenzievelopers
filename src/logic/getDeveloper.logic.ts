import { Request, Response} from 'express';
import { QueryConfig } from 'pg';
import { client } from '../database';

const getDeveloper = async (req:Request, res: Response): Promise<Response> => {

    const id: number =parseInt(req.params.id)

    const queryString: string = `
        SELECT
            dev.id,
            dev."name",
            dev."email",
            devInfo."developerSince",
            devInfo."preferredOS"
        FROM 
            developers dev
        FULL JOIN
            developer_infos devInfo
                ON devInfo."developerId" = dev.id
        WHERE
            dev.id = $1; 
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult = (await client.query(queryConfig)).rows[0]

    return res.json(queryResult)
}

export default getDeveloper