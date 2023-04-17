import { Request, Response, NextFunction, query } from "express";
import { client } from "../database";
import { QueryConfig } from "pg";
import { IDeveloperResponse } from "../interfaces/developers.interfaces";

const validateEmail = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {

    const devEmail: string = req.body.email || null

    if(!devEmail){
        return next()
    }

    const queryString: string = `
        SELECT
            *
        FROM
            developers dev
        WHERE
            dev.email = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [devEmail]
    }

    const queryResult: IDeveloperResponse = (await client.query(queryConfig)).rows[0]

    if(queryResult){
        return res.status(409).json({
            message: "Email already exists."
        })
    }

    return next()
}

export default validateEmail