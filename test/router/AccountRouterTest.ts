import chai from "chai";
import chaiHttp from "chai-http";
import {suite, test} from "mocha-typescript";

chai.use(chaiHttp);
const url = 'localhost:3000';
// const url = 'ireceipt.ciaosgarage.xyz';

@suite("AccountRouterTest 테스트")
class AccountRouterTest {
    static before() {
        // 이 테스트를 시작하기 전에 실행할 코드
    }

    static after() {
        // 이 테스트를 끝낼때 실행 할 코드

    }

    @test("UID 로그인 테스트")
    async uidLoginTest() {
        
    }
}
