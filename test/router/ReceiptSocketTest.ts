import {suite, test} from "mocha-typescript";
import chai from 'chai';
import {LoginOut} from "../util/LoginOut";
import {ReceiptMockMaker} from "../../src/utils/mock/MockMaker";
import {sleep} from "../../src/utils/sleep/Sleep";

let url = "http://localhost:3000";

@suite("ReceiptSocketTest")
class ReceiptSocketTest {
    loginOutModule = new LoginOut(url, null);
    mockMaker = new ReceiptMockMaker();

    after() {

    }

    @test("create 테스트")
    async createTest() {
        let manager = await this.loginOutModule.getManager();
        let socket = manager.socket("/receipt");
        socket.connect();

        // 연결이 될때까지 기다린다
        while (!socket.connected) {
            console.log("소켓 연결중");
            await sleep(1);
        }

        let mock = this.mockMaker.getMock();
        socket.emit("create", mock, (status: number, data: any) => {
            console.log("서버에서 돌아온 값", data);
            this.mockMaker.assertMock(mock, data);
        });

        await sleep(2);
        socket.disconnect();
    }

    @test("update 테스트")
    async updateTest() {
        let manager = await this.loginOutModule.getManager();
        let socket = manager.socket("/receipt");
        socket.connect();
    }
}
