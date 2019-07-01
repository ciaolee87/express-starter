import {suite, test} from "mocha-typescript";
import {assert} from "chai";
import chai from 'chai';
import chaiHttp from "chai-http";


chai.use(chaiHttp);
const url = 'localhost:3000';


@suite("Test 테스트")
class Test {
    // 최초 실행
    static async before() {

    }

    // 최후 실행
    static async after() {

    }

    @test("테스트")
    async test() {

    }
}




