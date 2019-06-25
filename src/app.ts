import EnvPath from "./utils/donenv/DotenvUtil";
import express from 'express';
import * as path from 'path';
import cookieParser from "cookie-parser";
import Helmet from "helmet";
import Hpp from "hpp";
import {AwsHealthCheckerMidware} from "./midwares/aws/AwsHealthCheckerMidware";
import {ResMidware} from "./midwares/res/ResMidware";
import {PageNotFoundMidware} from "./midwares/pageNotFound/PageNotFoundMidware";
import {ErrorMidware} from "./midwares/error/ErrorMidware";
import {DbSync} from "./utils/sequelize/Sequelize";
import {RootRouter} from "./routes/root/RootRouter";

// DotEnv 초기화
console.log("EnvPath", EnvPath);

// 데이터베이스 초기화
DbSync();

// Express 초기화
const ExpressApp = express();

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
ExpressApp.use(express.static(path.join(__dirname, '../pages/assets')));

// AWS HealthChecker
ExpressApp.use(AwsHealthCheckerMidware);

// response 커스텀 메서드 추가
ExpressApp.use(ResMidware);

// 로우터 추가하기
ExpressApp.use('/', RootRouter);

// 등록된 로우터로 접속하지 않을 경우 에러 처리
ExpressApp.use(PageNotFoundMidware);

// 에러 핸들러
ExpressApp.use(ErrorMidware);

// 포트열고 서버실행
const port = Number(process.env.PORT) || 3000;
ExpressApp.listen(port, () => {
    console.log(`Server ON, Port ${port}`);
}).on("error", (error) => {
    console.log(`Fail to open sever!`, error);
    process.exit(0);
});
