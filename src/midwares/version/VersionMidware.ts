import {RequestHandler} from "express";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";
import {BizError} from "../error/ErrorMidware";

const appVersion = String(process.env.CLIENT_VERSION || '1.0.0').split('.');

export const VersionMidware: RequestHandler = WrapRequestHandler(async (req, res, next) => {
    const {appvers} = req.query;

    // 앱 버전 추출하기
    const spApp = String(appvers).split('.');

    for (let i of [0, 1, 2]) {
        if (Number(spApp[i]) < Number(appVersion[i])) {
            throw new BizError(9950);
        }
    }

    // 앱 버전 확인 완료
    next();
});
