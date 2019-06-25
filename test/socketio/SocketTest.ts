import chai from "chai";
import chaiHttp from "chai-http";
import {suite, test} from "mocha-typescript";
import {Manager} from 'socket.io-client';
import {LoginOut} from "../util/LoginOut";
import {sleep} from "../../src/utils/sleep/Sleep";


chai.use(chaiHttp);
const url = 'http://localhost:3000';

@suite("SocketIO 테스트")
class SocketIOTest {
    loginUtil = new LoginOut(url, null);

    static before() {
        // 이 테스트를 시작하기 전에 실행할 코드
    }

    static after() {
        // 이 테스트를 끝낼때 실행 할 코드

    }

    before() {
        // 각 테스트 메소드가 실행되기전 매번 실행되는 코드
    }

    after() {
        // 각 테스트 메소드가 실행후 매번 실행되는 코드
    }

    @test("Connection 테스트")
    async Connectiontest() {

        // 토큰 생성하기
        let token = await this.loginUtil.login();

        let socket = new Manager(url, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'token': token
                    }
                }
            }
        });


        let receipt = socket.socket("/receipt");


        for (let i of [1, 2, 3, 4]) {
            receipt.emit("create", "abc", "ABC", (args: any) => {
                console.log(args);
            });
            await sleep(2)
        }
    }
}
