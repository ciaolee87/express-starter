import {RequestHandler} from "express-serve-static-core";
import express from "express";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";
import {DefResCode} from "../../resCode/ResCode";
import {SessionLogger} from "../../utils/logger/SessionLogger";

export const ResMidware: RequestHandler = WrapRequestHandler(async (req, res, next) => {
    // 새로운 세션 로거 시작
    res.logger = new SessionLogger();
    const logger = res.logger.createLogger();
    logger('url', req.url);
    logger('method', req.method);
    logger('body', req.body);
    logger('query', req.query);
    logger('cookie', req.cookies);
    logger('ip', req.ip);

    // 기능정의
    res.bizSend = (value?: { code?: DefResCode, body?: any }): express.Response => {

        // 0~999 까지는 예약 코드로
        let code = 200;
        if ((value) && (value.code)) {
            code = value.code.code;
        }
        let status = code < 1000 ? code : 200;

        // 응답 입력
        let response: any = {
            code: code,
            msg: value ? (value.code ? value.code.msg : "") : ""
        };

        // 바디가 있으면 추가한다
        if ((value) && (value.body)) {
            response.body = value.body;
        }

        // 결과 로그 출력
        logger('response', response);
        res.logger.flush();

        // 응답하기
        res.setHeader("content-type", "application/json");
        return res.status(status).send(response);
    };

    next();
});
