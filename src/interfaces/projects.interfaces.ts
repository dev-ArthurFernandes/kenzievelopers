interface IProjectRequest{
    name: string
    description: string
    estimatedTime: string
    repository: string
    startDate: Date,
    endDate?: Date | null,
    developerId: number
}

interface IProjectResponse extends IProjectRequest{
    id: number,
}

type technologies = ['JavaScript','Python','React','Express.js','HTML','CSS','Django','PostgreSQL','MongoDB']

interface ITechnologieRequest{
    name: technologies
}

export {
    IProjectRequest,
    IProjectResponse,
    ITechnologieRequest
}