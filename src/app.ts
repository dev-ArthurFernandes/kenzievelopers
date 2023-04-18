import express, { Application, json } from "express";
import "dotenv/config";
import { 
    validateEmail,
    validateId,
    verifyInfos
} from "./middlewares";
import {
    createDeveloper,
    createDeveloperInfo,
    deleteDeveloper,
    getDeveloper,
    updateDeveloper
} from "./logic";

const app: Application = express();

app.use(json())

// developers
app.post('/developers', validateEmail, createDeveloper)
app.post('/developers/:id/infos', validateId, verifyInfos, createDeveloperInfo)

app.get('/developers/:id', validateId, getDeveloper)

app.patch('/developers/:id', validateId, validateEmail, updateDeveloper)

app.delete('/developers/:id', validateId, deleteDeveloper)

export default app;
