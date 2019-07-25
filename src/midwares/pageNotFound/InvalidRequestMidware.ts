import {RequestHandler} from "express";
import {BizError} from "../error/ErrorMidware";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";
import {ResCode} from "../../resCode/ResCode";

export const InvalidRequestMidware: RequestHandler = WrapRequestHandler(async (req, res, next) => {
    throw new BizError(ResCode.c404)
});
