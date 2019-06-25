import {RequestHandler} from "express-serve-static-core";
import {JwtToken, JwtUtil} from "../../utils/jwt/JwtUtil";
import {Session} from "../../models/Session";
import {BizError} from "../error/ErrorMidware";
import {Account} from "../../models/Account";
import {WrapRequestHandler} from "../../routes/WrapRequestHandler";


/**
 * request 에 세션정보를 추출하여 입력해주는 미드웨어
 */
// 설정된 레벨
let setLevel: number = 0;

export const AuthMidware = (level?: number): RequestHandler => {
    // 초기화 해주기
    if (!(level)) {
        setLevel = 0
    } else {
        setLevel = level;
    }
    return auth;
};


const auth: RequestHandler = WrapRequestHandler(async (req, res, next) => {

    const {token} = req.headers;

    // 토큰이 존재하지 않으면 에러메시지 표시하기
    if (!(token)) {
        throw new BizError(401);
    }

    // 토큰 확인
    let sessInfo = await UserTokenAuth(String(token), setLevel);

    // 세션 정보 저장
    req.sessionInfo = {
        accountId: sessInfo.accountId,
        sessionId: sessInfo.sessionId
    };

    // 다음 헨들러로 넘어가기
    next();
});


export const UserTokenAuth = (token: string, level: number): Promise<{ accountId: number, sessionId: number }> => {
    return new Promise<{ accountId: number, sessionId: number }>(async (resolve, reject) => {
        try {
            const payload = JwtUtil.verify<JwtToken>(token);    // 토큰이 유효하지 않으면 에러가 난다 -> 에러처리 할것

            // 토큰이 유효하지 않으면 인증실패 메시지를 출력한다
            if (!payload) {
                reject();
                return;
            }

            // 토큰에서 정보를 가저온다
            const {accountId, deviceId} = payload;

            // 데이터 가저오기
            const userInfo = await Session.findOne({
                include: [Account],
                where: {
                    accountId: accountId,
                    deviceId: deviceId
                }
            });

            //토큰이 존재하지 않을경우 에러표시
            if (!(userInfo)) {
                reject();
            }

            // 접근 레벨 비교
            if (userInfo.account.lev < level) {
                reject();
            }

            // 토큰이 유효하면 최근 접속 정보
            userInfo.count += 1;
            await userInfo.save();

            resolve({
                accountId: userInfo.accountId,
                sessionId: userInfo.id
            });
        } catch (e) {
            reject(["사용자 토큰 인증", e]);
        }


    });
};
