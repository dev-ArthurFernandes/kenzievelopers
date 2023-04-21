import { Request, Response} from 'express';
import { client } from '../database';
import { QueryConfig } from 'pg';
import { IProjectResponse } from '../interfaces/projects.interfaces';


const getProjects =async (req: Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)

    var queryString: string = `
        SELECT
            *
        FROM
            projects
        WHERE
            id = $1;
    `

    var queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const project: IProjectResponse = (await client.query(queryConfig)).rows[0]

    queryString = `
        SELECT
            *
        FROM
            projects_technologies AS techPj
        FULL JOIN
            technologies AS tech
                ON tech.id = techPj."technologyId"
        WHERE
            "projectId" = $1;
    `

    const tech = (await client.query(queryConfig)).rows[0]

    return res.json([{
        "projectId": project.id,
        "projectName": project.name,
        "projectDescription": project.description,
        "projectEstimatedTime": project.estimatedTime,
        "projectRepository": project.repository,
        "projectStartDate": project.startDate,
        "projectEndDate": project.endDate,
        "projectDeveloperId": project.developerId,
        "technologyId": tech.id,
        "technologyName": tech.name
    }])
}

export default getProjects