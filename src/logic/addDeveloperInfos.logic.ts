import { Request, Response } from "express";
import { client } from "../database";
import { IDeveloperInfoRequest, IDeveloperInfoResponse } from "../interfaces/developers.interfaces";
import format from "pg-format";


const createDeveloperInfo =async (req: Request, res: Response): Promise<Response> => {

    const devId: number = parseInt(req.params.id)

    const infoData: IDeveloperInfoRequest = req.body

    infoData.developerSince = new Date(infoData.developerSince)

    infoData.developerId = devId

    const queryString: string = format(`
        INSERT INTO
            developer_infos(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(infoData),
        Object.values(infoData)
    )

    const queryResult: IDeveloperInfoResponse = (await client.query(queryString)).rows[0]

    return res.status(201).json(queryResult)
}

export default createDeveloperInfo