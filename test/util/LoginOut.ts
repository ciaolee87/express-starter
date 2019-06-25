import chai from 'chai';
import chaiHttp from "chai-http";
import {Manager} from 'socket.io-client';
import {ReceiptMockMaker} from "../../src/utils/mock/MockMaker";


chai.use(chaiHttp);

export class LoginOut {
    token: string = '';
    url: string = '';

    constructor(server: string, token: string) {
        this.url = server;

        if (token) {
            this.token = token;
        }
    }

    getManager(): Promise<SocketIOClient.Manager> {
        return new Promise<SocketIOClient.Manager>(async (resolve) => {
            let token = await this.login();
            let manager = new Manager(this.url, {
                transportOptions: {
                    polling: {extraHeaders: {'token': token}}
                }
            });
            resolve(manager);
        });
    }

    async login(): Promise<string> {
        return new Promise<string>(async (resolve) => {
            // 입력된 토큰이 존재하면 로그인을 시도하지 않는다
            if (this.token) {
                resolve(this.token);
            }

            let result = await chai.request(this.url).post('/account/uidLogin')
                .set("Content-Type", "application/json")
                .send({uid: "IZlaVNB6OwcE5YniMz1lYH4KTA63", deviceNm: "MockUp"});

            console.log('token', result.body.body.token);
            this.token = result.body.body.token;
            resolve(this.token);
        });
    }

    async logout() {
        let logoutRes = await chai.request(this.url).get('/account/tokenLogout')
            .set("token", this.token);
    }
}
