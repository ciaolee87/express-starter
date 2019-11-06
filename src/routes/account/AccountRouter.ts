import express from "express"
import {WrapRequestHandler} from "../WrapRequestHandler";


export const AccountRouter = express.Router();

AccountRouter.get('/', WrapRequestHandler(async (req, res, next) => {

}));
