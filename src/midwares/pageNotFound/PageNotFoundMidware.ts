import {RequestHandler} from "express";
import {BizError} from "../error/ErrorMidware";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";

export const PageNotFoundMidware: RequestHandler = WrapRequestHandler(async (req, res, next) => {
    throw new BizError(404)
});
