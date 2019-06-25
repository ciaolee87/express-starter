import {RequestHandler} from "express";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";

export const AwsHealthCheckerMidware: RequestHandler = WrapRequestHandler(async (req, res, next) => {
	if (req.url == '/aws/health') {
		res.status(200).send();
	} else {
		next();
	}
});
