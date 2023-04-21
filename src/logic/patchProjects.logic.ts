import { Request, Response} from 'express';
import { client } from '../database';
import format from 'pg-format';


const patchProject =async (req:Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)

    const projectData = req.body

    const queryString: string = format(`
        UPDATE
            projects pj
        SET(%I) = ROW(%L)
        WHERE
            pj.id = %s
        RETURNING *;
    `,
        Object.keys(projectData),
        Object.values(projectData),
        id
    )

    const queryResult = (await client.query(queryString)).rows[0]

    return res.json(queryResult)
}

export default patchProject