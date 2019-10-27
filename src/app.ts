import EnvPath from "./utils/donenv/DotenvUtil";
import express from 'express';
import * as path from 'path';
import cookieParser from "cookie-parser";
import Helmet from "helmet";
import Hpp from "hpp";
import {AwsHealthCheckerMidware} from "./midwares/aws/AwsHealthCheckerMidware";
import {ResMidware} from "./midwares/res/ResMidware";
import {InvalidRequestMidware} from "./midwares/pageNotFound/InvalidRequestMidware";
import {ErrorMidware} from "./midwares/error/ErrorMidware";
import {DbSync} from "./utils/sequelize/Sequelize";
import {RootRouter} from "./routes/root/RootRouter";
import {UploadRouter} from "./routes/upload/UploadRouter";
import LogRemover from "./utils/logger/LogRemover";

// DotEnv 초기화
console.log("EnvPath", EnvPath);

// 데이터베이스 초기화
DbSync();

// Express 초기화
const ExpressApp = express();

// 로그 자동 삭제 스케쥴러 시작
LogRemover.invoke();

// 기초보안패치
ExpressApp.use(Helmet());
ExpressApp.use(Hpp());

// parser 설정
ExpressApp.use(express.json());
ExpressApp.use(express.urlencoded({extended: false}));
ExpressApp.use(cookieParser());

// static 파일 위치 설정(그림 및 파일 등)
ExpressApp.use(express.static(path.join(__dirname, '../pages/')));

// AWS HealthChecker
ExpressApp.use(AwsHealthCheckerMidware);

// request 커스텀 메서드 추가
ExpressApp.use(ResMidware);

// 이곳에 라우터 추가하기
ExpressApp.use('/', RootRouter);
ExpressApp.use('/upload', UploadRouter);

// 등록된 요청값이 아니면 에러처리 하기
ExpressApp.use(InvalidRequestMidware);

// 에러 핸들러
ExpressApp.use(ErrorMidware);

// 포트열고 서버실행
ExpressApp.listen(Number(process.env.PORT), () => {
    console.log(`Server ON, Port ${process.env.PORT}`);
}).on("error", (error) => {
    console.log(`Fail to open sever!`, error);
    process.exit(0);
});
