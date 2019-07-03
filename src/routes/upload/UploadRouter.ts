import express from "express"
import {WrapRequestHandler} from "../WrapRequestHandler";
import MulterMidware from "../../utils/multer/Multer";

export const UploadRouter = express.Router();

UploadRouter.post('/', MulterMidware.array("image"), WrapRequestHandler(async (req, res, next) => {
    res.bizSend();
}));


