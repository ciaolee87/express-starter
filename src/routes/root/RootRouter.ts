import express from "express"
import {WrapRequestHandler} from "../WrapRequestHandler";
import * as path from "path";


export const RootRouter = express.Router();

RootRouter.get('/', WrapRequestHandler(async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../../pages/index.html'));
}));
