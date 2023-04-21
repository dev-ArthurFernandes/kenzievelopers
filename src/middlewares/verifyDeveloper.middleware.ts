import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import format from "pg-format";
import { IProjectRequest } from "../interfaces/projects.interfaces";
import { QueryConfig } from "pg";


const verifyDeveloper = async (req:Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    if(req.body.developerId){
        const projectData: IProjectRequest = req.body

        const id: number = projectData.developerId

        const queryString: string = `
            SELECT
                *
            FROM
                developers dev
            WHERE
                dev.id = $1
        `
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [id]
        }

        const queryResult: boolean = (await client.query(queryConfig)).rowCount? true : false

        if(!queryResult){
            return res.status(404).json({
                message: "Developer not found."
            })
        }

        return next()
    }

    return next()
}

export default verifyDeveloper