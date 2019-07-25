import {ErrorRequestHandler, NextFunction, Request, Response} from "express-serve-static-core";
import {StackLogger} from "../../utils/logger/StackLogger";
import {DefResCode} from "../../resCode/ResCode";


// 에러 미들웨어
export const ErrorMidware: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // 기본값
    let response = {
        code: 500,
        msg: 'System error',
    };

    // 입력값이 있으면 그 값을 입력한다
    if (err instanceof BizError) {
        response = {
            code: err.code,
            msg: err.msg || ('ERROR'),
        };
    }

    // 에러정보 로그 출력
    StackLogger.stack('에러정보');
    StackLogger.stack(err.msg || err);

    // 결과 로그 출력
    StackLogger.stack("Response", response);

    // 로거출력
    StackLogger.flush();

    // 에러 표시
    const resCode = err.code < 1000 ? err.code : 200;
    res.status(resCode).json(response);
};


/**
 *
 */
export class BizError extends Error {
    code: number;
    msg?: any;
    exception: any;

    constructor(resCode: DefResCode, e?: any) {
        super(resCode.msg);
        this.code = resCode.code;
        this.msg = resCode.msg;
        this.exception = e;
    }
}
