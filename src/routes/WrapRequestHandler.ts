import {RequestHandler} from "express";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {BizError} from "../midwares/error/ErrorMidware";
import {ResCode} from "../resCode/ResCode";
import {StackLogger} from "../utils/logger/StackLogger";

export function WrapRequestHandler(handler: RequestHandler): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (e) {
            if (e instanceof BizError) {
                next(e);
            } else {
                StackLogger.stack(e);
                next(new BizError(ResCode.c500));
            }
        }
    };
}
