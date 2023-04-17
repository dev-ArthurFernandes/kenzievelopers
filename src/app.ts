import express, { Application, json } from "express";
import "dotenv/config";
import {
    getDeveloper
} from "./logic";
import {
    validateId
} from "./middleware";

const app: Application = express();

app.use(json())

app.get('/developers/:id', validateId, getDeveloper)

export default app;
