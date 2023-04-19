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

    var queryConfig: QueryConfig = {
        text: queryString,
        values: [techName]
    }

    const techId = (await client.query(queryConfig)).rows[0].id

    queryString = format(`
        INSERT INTO
            projects_technologies(%I)
        VALUES(%L);
    `,
        ["addedIn","technologyId","projectId"],
        [new Date(), techId, projectId]
    )

    await client.query(queryString)

    queryString = `
        SELECT
            *
        FROM 
            projects
        WHERE
            id = ${projectId}
    `

    const project = (await client.query(queryString)).rows[0]

    return res.json({
        "tehcnologyId": techId,
        "technologyName": techName,
        ...project
    })
}

export default addProjectTechnologie