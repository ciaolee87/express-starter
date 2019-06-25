import express from 'express';
import * as path from 'path';
import cookieParser from "cookie-parser";
import {ErrorMidware} from "./midwares/error/ErrorMidware";
import {ResMidware} from "./midwares/res/ResMidware";
import {LoadDotenv} from "./utils/donenv/DotenvUtil";
import {PageNotFoundMidware} from "./midwares/pageNotFound/PageNotFoundMidware";
import Logger from "./utils/logger/WinstonLogger";
import Helmet from "helmet";
import Hpp from "hpp";
import {AwsHealthCheckerMidware} from "./midwares/aws/AwsHealthCheckerMidware";
import AccountRouter from "./routes/account/AccountRouter";
import {BootService} from "./services/boot/BootService";

export const ExpressApp = express();

// dotEnv 설정값 가저오기
LoadDotenv();

// 부팅 서비스
BootService();

// 기초보안패치
ExpressApp.use(Helmet());
ExpressApp.use(Hpp());

// body parser 설정
ExpressApp.use(express.json());

// json parser 설정
ExpressApp.use(express.json());
ExpressApp.use(express.urlencoded({extended: false}));

// cookie parser 설정
ExpressApp.use(cookieParser());

// static 파일 위치 설정(그림 및 파일 등)
ExpressApp.use(express.static(path.join(__dirname, 'assets')));

// AWS HealthChecker
ExpressApp.use(AwsHealthCheckerMidware);

// response 커스텀 메서드 추가
ExpressApp.use(ResMidware);

// 로우터 추가하기
ExpressApp.use('/account', AccountRouter);

// 등록된 로우터로 접속하지 않을 경우 에러 처리
ExpressApp.use(PageNotFoundMidware);

// 에러 핸들러
ExpressApp.use(ErrorMidware);

// 포트열고 서버실행
const port = Number(process.env.PORT) || 3000;
export const HttpServer = ExpressApp.listen(port, () => {
    Logger.debug(`서버 기동 완료 ${port} 포트`);
}).on("error", (error) => {
    Logger.debug(`서버 기동 실패!`, error);
    process.exit(0);
});

