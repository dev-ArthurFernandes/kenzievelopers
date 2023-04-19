import { Request, Response, query } from "express";
import { client } from "../database";
import format from "pg-format";
import { IProjectRequest } from "../interfaces/projects.interfaces";


const createProject = async (req:Request, res: Response): Promise<Response> => {
    
    const projectData: IProjectRequest = req.body

    const queryString: string = format(`
        INSERT INTO
            projects(%I)
        VALUES(%L)
        RETURNING *;
    `,
        Object.keys(projectData),
        Object.values(projectData)
    )

    const queryResult = (await client.query(queryString)).rows[0]

    return res.status(201).json(queryResult)
}

export default createProject