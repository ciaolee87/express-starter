import {RequestHandler} from "express-serve-static-core";
import express from "express";
import {StackLogger} from "../../utils/logger/StackLogger";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";

const enUS = require('../../../resources/codes/en-US.json');
export const ResMidware: RequestHandler = WrapRequestHandler(async (req, res, next) => {
    // stack 로거를 초기화 시킨다
    StackLogger.init();

    // 리퀘스트 로거 출력
    StackLogger.stack('url', [req.url]);
    StackLogger.stack('method', [req.method]);
    StackLogger.stack('token', [req.headers.token]);
    StackLogger.stack('body', [req.body]);
    StackLogger.stack('query', [req.query]);
    StackLogger.stack('cookie', [req.cookies]);


    // 기능정의
    res.bizSend = (value?: { code?: number, body?: any }): express.Response => {

        // 0~999 까지는 예약 코드로
        let code = 200;
        if ((value) && (value.code)) {
            code = value.code;
        }
        let status = code < 1000 ? code : 200;

        // 응답 입력
        let response:any = {
            code: code,
            msg: enUS[String(code)] || "", // 다국어화 할떄 이곳을 고치기
        };

        // 바디가 있으면 추가한다
        if ((value) && (value.body)) {
            response.body = value.body;
        }

        // 결과 로그 출력
        StackLogger.stack("Response", response);

        // 로그출력
        StackLogger.flush();

        // 응답하기
        res.setHeader("content-type", "application/json");
        return res.status(status).send(response);
    };

    next();
});
