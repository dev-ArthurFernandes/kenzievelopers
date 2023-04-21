import express, { Application, json } from "express";
import "dotenv/config";
import { 
    validateEmail,
    validateId,
    verifyInfos,
    verifyDeveloper,
    verifyTech,
    ensureTech,
    ensuerOS
} from "./middlewares";
import {
    createDeveloper,
    createDeveloperInfo,
    createProject,
    deleteDeveloper,
    getDeveloper,
    getProjects,
    updateDeveloper,
    patchProject,
    deleteProject,
    addProjectTechnologie,
    deleteProjectTechnology
} from "./logic";

const app: Application = express();

app.use(json())

// developers
app.post('/developers', validateEmail, createDeveloper)
app.post('/developers/:id/infos', validateId, verifyInfos, ensuerOS, createDeveloperInfo)

app.get('/developers/:id', validateId, getDeveloper)

app.patch('/developers/:id', validateId, validateEmail, updateDeveloper)

app.delete('/developers/:id', validateId, deleteDeveloper)


// projects
app.post('/projects', verifyDeveloper, createProject)
app.post('/projects/:id/technologies', validateId, ensureTech, verifyTech, addProjectTechnologie)

app.get('/projects/:id', validateId, getProjects)

app.patch('/projects/:id', validateId, verifyDeveloper, patchProject)

app.delete('/projects/:id', validateId, deleteProject)
app.delete('/projects/:id/technologies/:name', validateId, ensureTech, deleteProjectTechnology)



export default app;