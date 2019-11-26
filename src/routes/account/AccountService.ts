// import {FirebaseAdmin} from "../../utils/firebaseAdmin/FirebaseAdmin";
// import {Account} from "../../models/Account";
// import {BizError} from "../../midwares/error/ErrorMidware";
// import {ResCode} from "../../resCode/ResCode";
// import {JwtUtil} from "../../utils/jwt/JwtUtil";
//
// class AccountService {
//
// 	// 회원가입
// 	static async join(status: {
// 		uid: string
// 	}) {
// 		// 유저 정보 가정오기
// 		const firebaseUser = await FirebaseAdmin.auth().getUser(status.uid);
//
// 		// if (!firebaseUser) {
// 		// 	// 파이어베이스에 데이터 없음
// 		// 	throw new BizError(ResCode.c1000);
// 		// }
//
// 		// 회원가입하기
// 		const user = await Account.create({
// 			email: firebaseUser.email,
// 			uid: firebaseUser.uid
// 		});
//
// 		return;
// 	}
//
// 	static async loginWithUid(status: {
// 		uid: string
// 	}):Promise<string> {
// 		// 유저 정보 가정오기
// 		const user = await Account.findOne({
// 			where: {
// 				uid: status.uid
// 			}
// 		});
//
// 		if (!user) {
// 			throw new BizError(ResCode.c1001);
// 		}
//
// 		// 토큰 생성하기
// 		const token = JwtUtil.mkToken({}, {
// 			algorithm: 'RS512'
// 		})
//
// 		return '';
// 	}
// }
//
// export default AccountService;
