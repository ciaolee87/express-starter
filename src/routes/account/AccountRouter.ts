import express from "express"
import {JwtToken, JwtUtil} from "../../utils/jwt/JwtUtil";
import uuid from 'uuid';
import {Account} from "../../models/Account";
import {Session} from "../../models/Session";
import {AuthMidware} from "../../midwares/auth/AuthMidware";
import {WrapRequestHandler} from "../WrapRequestHandler";


const AccountRouter = express.Router();

// UID 를 이용하여 토큰을 발급 -> 완전히 새로운 계정
// 요청 파라미터 : uid, deviceNm
AccountRouter.post('/uidLogin', WrapRequestHandler(async (req, res, next) => {
    //
    // // 요청 정보에서 uid 가저오기
    // const {uid, deviceNm} = req.body;
    //
    // // firebase 서버에서 유저 정보 존재하는지 검사
    // let user = await FirebaseAdmin.auth().getUser(uid);     // 유저정보 가저오기
    // let method = user.providerData[0].providerId;           // 등록방법
    //
    // // uid 정보 입력하기
    // const result = await Account.findOrCreate({
    //     where: {
    //         uid: uid,
    //         method: method
    //     }
    // });
    //
    // // accountId 가저오기 (입력을 했으므로 반듯이 존재함 -> 에러처리 X)
    // const account: Account = result[0];
    //
    // // 토큰 만들기
    // const deviceId = uuid.v4().substring(0, 8);
    // const token = JwtUtil.mkToken<JwtToken>({
    //     accountId: account.id,
    //     deviceId: deviceId
    // });
    //
    // // 서버에 접속 정보 저장
    // await Session.create({
    //     accountId: account.id,
    //     deviceId: deviceId,
    //     deviceNm: deviceNm
    // });
    //
    // // 응답하기
    // res.bizSend({
    //     body: {
    //         token: token
    //     }
    // });
}));

// 토큰을 확인하는 로우터
AccountRouter.get('/tokenLogin', AuthMidware(0), WrapRequestHandler(async (req, res) => {
    res.bizSend();
}));

// 로그아웃 (토큰 삭제)
AccountRouter.get('/tokenLogout', AuthMidware(0), WrapRequestHandler(async (req, res) => {
    // 세션 정보를 지운다
    await Session.destroy({
        where: {
            id: req.sessionInfo.sessionId
        }
    });

    // 로그아웃 완료
    res.bizSend();
}));

export default AccountRouter;
