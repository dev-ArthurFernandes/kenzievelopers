import { Request, Response } from "express";
import { client } from "../database";
import { QueryConfig } from "pg";
import format from "pg-format";


const addProjectTechnologie =async (req:Request, res: Response): Promise<Response> => {
    
    const projectId: number = parseInt(req.params.id)

    const techName: string = req.body.name

    var queryString: string = `
        SELECT
            *
        FROM
            technologies tech
        WHERE
            tech.name = $1 
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [techName]
    }

    const techId = (await client.query(queryConfig)).rows[0].id

    queryString = format(`
        INSERT INTO
            projects_technologies(%I)
        VALUES(%L)
        RETURNING
            "id",
            "name"
        LEFT JOIN
            project proj
                ON proj.id = %n;
    `,
        ["addedIn","TechnologyId","ProjectId"],
        [Date(), techId, projectId]
    )

    const queryResult = (await client.query(queryString)).rows[0]

    return res.json(queryResult)
}

export default addProjectTechnologie