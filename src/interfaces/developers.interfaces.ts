interface IDeveloperRequest{
    name: string,
    email: string
}

interface IDeveloperResponse extends IDeveloperRequest{
    id: number
}

interface IDeveloperInfoRequest{
    developerSince: Date,
    preferredOS: "Windows" | "Linux" | "MacOS",
    developerId: number
}

interface IDeveloperInfoResponse extends IDeveloperInfoRequest{
    id: number
}

type validOS = ["Windows", "Linux", "MacOS"]

export {
    IDeveloperRequest,
    IDeveloperResponse,
    IDeveloperInfoRequest,
    IDeveloperInfoResponse,
    validOS
}