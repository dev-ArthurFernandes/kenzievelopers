import { Request, Response, NextFunction} from 'express';
import { client } from '../database';
import { QueryConfig } from 'pg';


const verifyInfos = async (req:Request, res: Response, next: NextFunction): Promise<void | Response> => {
    
    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM
            developer_infos devInfo
        WHERE
            devInfo."developerId" = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: boolean = (await client.query(queryConfig)).rowCount? true : false

    if(!queryResult){
        return next()
    }

    return res.status(409).json({
        message: "Developer infos already exists."
    })
}

export default verifyInfos