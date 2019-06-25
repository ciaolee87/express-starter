import * as Jwt from "jsonwebtoken";
import {SignOptions} from "jsonwebtoken";
import {BizError} from "../../midwares/error/ErrorMidware";


const secret = process.env.JWT_TOKEN_SECRET;

export const JwtUtil = {
    mkToken<T>(payload: T, options?: SignOptions): string {
        return Jwt.sign(
            payload as any,
            secret,
            options
        )
    },
    verify<T>(token: any): T | any {
        try {
            return Jwt.verify(token, secret, {}) as T | any
        } catch (e) {
            throw new BizError(403, '토큰 Decode 실패');
        }

    }
};

export interface JwtToken {
    accountId: number,
    deviceId: string
}
