import { Request, Response } from "express";
import { client } from "../database";
import format from "pg-format";

const updateDeveloper =async (req:Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)

    const queryString: string = format(`
        UPDATE
            developers dev
        SET(%I) = ROW(%L)
        WHERE
            dev.id = %s
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body),
        id
    )

    const queryResult = (await client.query(queryString)).rows[0]

    return res.json(queryResult)
}

export default updateDeveloper