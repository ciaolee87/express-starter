import {suite, test} from "mocha-typescript";
import {assert} from "chai";
import chai from 'chai';
import chaiHttp from "chai-http";

chai.use(chaiHttp);
// const url = 'localhost:3000';
const url = 'ireceipt.ciaosgarage.xyz';

@suite("BootRouterTest 테스트")
class BootRouterTest {
    @test("AppVersion 테스트")
    async AppVersion() {
        let res = await chai.request(url).get('/boot/version?appvers=1.0.0');

        console.log(res.body);
    }
}
