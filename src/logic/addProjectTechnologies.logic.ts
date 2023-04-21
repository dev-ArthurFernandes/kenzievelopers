import { Request, Response } from "express";
import { client } from "../database";
import { QueryConfig } from "pg";
import format from "pg-format";
import { IProjectResponse } from "../interfaces/projects.interfaces";


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

    const project: IProjectResponse = (await client.query(queryString)).rows[0]

    return res.status(201).json({
        "technologyId": techId,
        "technologyName": techName,
        "projectId": project.id,
        "projectName": project.name,
        "projectDescription": project.description,
        "projectEstimatedTime": project.estimatedTime,
        "projectRepository": project.repository,
        "projectStartDate": project.startDate,
        "projectEndDate": project.endDate
    })
}

export default addProjectTechnologie