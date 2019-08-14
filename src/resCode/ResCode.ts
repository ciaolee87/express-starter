import {Request, Response} from "express-serve-static-core";
import {StackLogger} from "../utils/logger/StackLogger";

export class ResCode {
    static c200: DefResCode = {code: 200, msg: "success"};
    static c401: DefResCode = {
        code: 401, msg: "session-expired", callback: (req, res) => {
            StackLogger.stack('세션쿠키를 삭제합니다');
            res.clearCookie('session-cookie');
        }
    };
    static c403: DefResCode = {
        code: 403, msg: "fail-jwt-token-decode", callback: (req, res) => {
            StackLogger.stack('세션쿠키를 삭제합니다');
            res.clearCookie('session-cookie');
        }
    };
    static c404: DefResCode = {code: 404, msg: "page-not-found"};
    static c500: DefResCode = {code: 500, msg: "server-error"};
    static c1000: DefResCode = {code: 1000, msg: "account-not-found"};
    static c9950: DefResCode = {code: 9950, msg: "unsupported-client-version"};
}


export type DefResCode = {
    code: number,
    msg: string,
    callback?: (req: Request, res: Response) => void;
}
