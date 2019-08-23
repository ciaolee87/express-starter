import {ErrorRequestHandler, NextFunction, Request, Response} from "express-serve-static-core";
import {DefResCode} from "../../resCode/ResCode";


// 에러 미들웨어
export const ErrorMidware: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // 기본값
    let response = {
        code: 500,
        msg: 'System error',
    };

    // 에러정보 로그 출력
    const logger = res.logger.createLogger('에러정보');
    if (err instanceof BizError) {

    } else {
        logger(err);
    }

    // 입력값이 있으면 그 값을 입력한다
    if (err instanceof BizError) {
        response = {
            code: err.code,
            msg: err.msg || ('ERROR'),
        };
        logger(err.msg);
        logger(err.exception);

        // 콜백실행
        if (err.resCode.callback) {
            logger('에러 콜백을 실행합니다');
            err.resCode.callback(req, res);
        }
    }

    // 결과 로그 출력
    logger("response", response);
    res.logger.flush();

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
    resCode: DefResCode;

    constructor(resCode: DefResCode, e?: any) {
        super(resCode.msg);
        this.code = resCode.code;
        this.msg = resCode.msg;
        this.exception = e;
        this.resCode = resCode;
    }
}
