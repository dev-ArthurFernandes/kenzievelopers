import express, { Application, json } from "express";
import "dotenv/config";
import { 
    validateEmail,
    validateId,
    verifyInfos,
    verifyDeveloper
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
    addProjectTechnologie
} from "./logic";

const app: Application = express();

app.use(json())

// developers
app.post('/developers', validateEmail, createDeveloper)
app.post('/developers/:id/infos', validateId, verifyInfos, createDeveloperInfo)

app.get('/developers/:id', validateId, getDeveloper)

app.patch('/developers/:id', validateId, validateEmail, updateDeveloper)

app.delete('/developers/:id', validateId, deleteDeveloper)


// projects
app.post('/projects', verifyDeveloper, createProject)
app.post('/projects/:id/technologies', validateId, addProjectTechnologie)

app.get('/projects/:id', validateId, getProjects)

app.patch('/projects/:id', validateId, verifyDeveloper, patchProject)

app.delete('/projects/:id', validateId, deleteProject)



export default app;