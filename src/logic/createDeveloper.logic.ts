import { Request, Response, query } from "express";
import { client } from "../database";
import { IDeveloperRequest, IDeveloperResponse } from "../interfaces/developers.interfaces";
import format from "pg-format";

const createDeveloper = async (req: Request, res: Response): Promise<Response> => {

    const developerData: IDeveloperRequest = req.body

    const queryString: string = format(`
        INSERT INTO
            developers(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(developerData),
        Object.values(developerData)
    )

    const queryResult: IDeveloperResponse = (await client.query(queryString)).rows[0]

    return res.status(201).json(queryResult)
}

export default createDeveloper