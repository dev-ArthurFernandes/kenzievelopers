import express, { Application, json } from "express";
import "dotenv/config";
import { 
    validateEmail,
    validateId
} from "./middlewares";
import {
    createDeveloper,
    createDeveloperInfo,
    getDeveloper
} from "./logic";

const app: Application = express();

app.use(json())

// developers
app.post('/developers', validateEmail, createDeveloper)
app.post('/developers/:id/infos', validateId, createDeveloperInfo)

app.get('/developers/:id', validateId, getDeveloper)

export default app;
