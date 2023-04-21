import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { technologies } from "../interfaces/projects.interfaces";


const ensureTech =async (req:Request, res: Response, next: NextFunction): Promise<void | Response> => {
    
    const tech: string = req.body.name

    const validTechnologies = ['JavaScript','Python','React','Express.js','HTML','CSS','Django','PostgreSQL','MongoDB']

    if(validTechnologies.includes(tech)){
        return next()
    }

    return res.status(400).json({
        "message": "Technology not supported.",
        "options": [
            "JavaScript",
            "Python",
            "React",
            "Express.js",
            "HTML",
            "CSS",
            "Django",
            "PostgreSQL",
            "MongoDB"
          ]
      })
}

export default ensureTech