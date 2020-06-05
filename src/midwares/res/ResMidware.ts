import {RequestHandler} from "express-serve-static-core";
import express from "express";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";
import {DefResCode} from "../../resCode/ResCode";
import uuid from 'uuid';
import BizLogger from "../../utils/logger/Logger";

export const ResMidware: RequestHandler = WrapRequestHandler(async (req, res, next) => {
    // 고유 요청 아이디 생성
    req.requestId = uuid.v4();



    // 새로운 로거 시작
    req.logger = (key, value) => {
        const  wrapValue = {
            requestId: req.requestId,
            ...value
        }
        BizLogger(key, wrapValue);
    }

    const {url, method, query, cookies, ip, body} = req;
    req.logger('request', {url, method, query, cookies, ip, body});

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
        req.logger('response', response);

        // 응답하기
        res.setHeader("content-type", "application/json");
        return res.status(status).send(response);
    };

    // 다운로드 정의
    res.bizFileSend = (filepath: string, callback?: (err: any) => void) => {
        req.logger('filepath', filepath);
        res.sendFile(filepath, callback);
    };
    next();
});
