import {suite, test} from "mocha-typescript";
import {assert} from "chai";
import chai from 'chai';
import chaiHttp from "chai-http";
import {MockReceipt, ReceiptMockMaker} from "../../src/utils/mock/MockMaker";
import {LoginOut} from "../util/LoginOut";

chai.use(chaiHttp);
const url = 'localhost:3000';
// const url = 'https://ireceipt.ciaosgarage.xyz';

let testcase = 10;                  // 해당 테스트당 반복 횟수
// let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsImRldmljZUlkIjoiNWNjYjBmMTkiLCJpYXQiOjE1NTcyODM4OTd9.413K8_OJdOvJkifIUCfjYnf7mSEiMwqmXDrlWzJa8R";
let token: string;
let logInOut = new LoginOut(url, token);


@suite("ReceiptRouterTest 테스트")
class ReceiptRouterTest {
    // 최초 실행
    static async before() {
        token = await logInOut.login();
    }

    // 최후 실행
    static async after() {
        // await logInOut.logout();
    }

    @test("개시글을 포스팅 테스트")
    async post() {
        // 모든 글 삭제
        await this.deleteAll();

        // 글 포스팅 하기
        const receiptMaker = new ReceiptMockMaker();

        for (let i = 0; i < testcase; i++) {
            const receipt = receiptMaker.getMock();
            let uploadResult = await chai.request(url).put('/receipt/one')
                .set("token", token)
                .send(receipt);

            // 업로드 후, 응답 영수증 데이터와 비교
            let resultReceipt = uploadResult.body.body.receipt;
            this.assert(receipt, resultReceipt);
        }
    }

    @test("삭제 테스트")
    async delete() {
        // 모든 글 삭제
        await this.deleteAll();

        // 임시포스팅을 한다
        let receiptList = await this.uploadTemp();

        // 1 개씩 삭제하고 확인한다
        for (let receipt of receiptList) {
            let deleteResult = await chai.request(url).delete('/receipt/one')
                .set("token", token)
                .send({id: receipt.id});

            assert.strictEqual(deleteResult.status, 200);
        }

        // 모든 데이터를 삭제 했으므로 모든 글의 갯수는 0개가 된다
        let countResult = await chai.request(url).get('/receipt/count')
            .set("token", token);

        assert.strictEqual(countResult.body.body.count, 0);
    }

    @test("수정 테스트")
    async edit() {
        // 모든 글 삭제
        await this.deleteAll();

        // 임시포스팅을 한다
        let receiptList = await this.uploadTemp();

        // 데이터를 수정하고 확인한다
        let receiptMaker = new ReceiptMockMaker();
        for (let receipt of receiptList) {
            let mock = receiptMaker.getMock();

            receipt.lati = mock.lati;
            receipt.currency = mock.currency;
            receipt.long = mock.long;
            receipt.memo = mock.memo;
            receipt.categoryId = mock.categoryId;

            let updateReceiptRes = await chai.request(url).post('/receipt/one')
                .set("token", token)
                .send(receipt);

            let updateReceipt = updateReceiptRes.body.body.receipt;
            this.assert(mock, updateReceipt);
        }
    }


    @test("동기화 테스트")
    async sync() {
        await this.deleteAll();
        let receiptList = await this.uploadTemp();

        // 데이터를 수정하고 확인한다
        let receiptMaker = new ReceiptMockMaker();
        let updatedReceiptList = [];
        for (let receipt of receiptList) {
            let mock = receiptMaker.getMock();

            receipt.lati = mock.lati;
            receipt.currency = mock.currency;
            receipt.long = mock.long;
            receipt.memo = mock.memo;
            receipt.categoryId = mock.categoryId;

            // 싱크를 하지 않고 업데이트
            let updateReceiptRes = await chai.request(url).post('/receipt/oneWithoutSync')
                .set("token", token)
                .send(receipt);

            let updateReceipt = updateReceiptRes.body.body.receipt;
            this.assert(mock, updateReceipt);

            // 업데이트된 데이터 저장
            updatedReceiptList.push(updateReceipt);
        }

        // 업데이트된 정보와 싱크정보 일치하는지 검사
        let syncResult = await chai.request(url).get('/receipt/sync')
            .set("token", token);


        let syncReceipt: Array<any> = syncResult.body.body.receipt;


        for (let receipt of updatedReceiptList) {
            let target = syncReceipt.find(value => {
                return value.id == receipt.id;
            });

            if (target) {
                // 싱크데이터가 서로 같은지 확인
                this.assert(receipt, target);
            } else {
                // 검색이 되지 않으면 동기화 데이터가 없다는 뜻이므로 실패
                assert.fail();
            }
        }
    }

    /* 테스트를 위한 메소드들 */
    async deleteAll(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let removeResult = await chai.request(url).head('/receipt/reset')
                .set("token", token);

            // 모든글 삭제 실패
            if (removeResult.status !== 200) {
                assert.fail()
            }

            // 글 갯수 확인
            let count = await this.countUp();
            if (count != 0) {
                assert.fail();
            }

            resolve();
        });
    }

    // 세션 계정의 모든 영수증의 숫자를 반환한다
    async countUp(): Promise<number> {
        return new Promise<number>(async resolve => {
            let countResult = await chai.request(url).get('/receipt/count')
                .set("token", token);

            if (countResult.status !== 200) {
                assert.fail()
            }

            resolve(countResult.body.body.count);
        });


    }

    async uploadTemp(): Promise<Array<MockReceipt>> {
        return new Promise(async (resolve, reject) => {
            const receiptMaker = new ReceiptMockMaker();
            let receiptList = [];
            for (let i = 0; i < testcase; i++) {
                const receipt = receiptMaker.getMock();
                let uploadResult = await chai.request(url).put('/receipt/one')
                    .set("token", token)
                    .send(receipt);

                // 업로드 후, 응답 영수증 데이터와 비교
                let resultReceipt = uploadResult.body.body.receipt;
                this.assert(receipt, resultReceipt);
                receiptList.push(resultReceipt);
            }
            resolve(receiptList);
        });
    }


    assert(r1: any, r2: any) {
        assert.strictEqual(r1.memo, r2.memo);
        assert.strictEqual(r1.lati, r2.lati);
        assert.strictEqual(r1.long, r2.long);
        assert.strictEqual(r1.currency, r2.currency);
        // assert.strictEqual(r1.regAt, r2.regAt);
        assert.strictEqual(r1.categoryId, r2.categoryId);
    }
}




