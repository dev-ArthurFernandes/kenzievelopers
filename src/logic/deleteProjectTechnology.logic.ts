import { Request, Response } from "express";
import { client } from "../database";


const deleteProjectTechnology = async (req:Request, res: Response): Promise<Response> => {
    
    const projectId: number = parseInt(req.params.id)

    const techName: string = req.params.name

    var queryString: string = `
        SELECT
            *
        FROM
            technologies
        WHERE
            name = '${techName}'
    `

    const techId: number = (await client.query(queryString)).rows[0].id

    queryString = `
        SELECT
            *
        FROM
            projects_technologies
        WHERE
            "projectId" = ${projectId} AND "technologyId" = ${techId}
    `

    const isRegistered: boolean = (await client.query(queryString)).rowCount? true : false 

    if(!isRegistered){
        return res.status(400).json({
            message: "Technology not related to the project."
        })
    }

    queryString = `
        DELETE FROM
            projects_technologies
        WHERE
            "projectId" = ${projectId} AND "technologyId" = ${techId};
    `
    await client.query(queryString)

    return res.status(204).send()
}

export default deleteProjectTechnology