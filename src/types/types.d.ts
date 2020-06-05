import {DefResCode} from "../resCode/ResCode";

declare global {
    namespace Express {
        export interface Response {
            // 클라이언트 응답 기능
            bizSend: (value?: { code?: DefResCode, body?: any }) => Response;

            bizFileSend: (filepath: string, callback?: (err: any) => void) => void;
        }
    }
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                accountId: number,
                sessionId: number
            };
            requestId: string,
            logger: (key: string, value: any) => void
        }
    }
}
