import { Request, Response, NextFunction } from "express";


const ensuerOS = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    const OS = req.body.preferredOS

    const validOS = ["Windows", "Linux", "MacOS"]

    if(!validOS.includes(OS)){
        return res.status(400).json({
            message: "Operation System not allowed",
            options: [
                "Windows",
                "Linux",
                "MacOS"
            ]
        })
    }

    return next()
}

export default ensuerOS