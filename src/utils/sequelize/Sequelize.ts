import {Sequelize} from 'sequelize-typescript';
import {SequelizerUtil} from "./SequelizeUtil";
import {Models} from "../../models";
import {SyncOptions} from "sequelize";
import Logger from "../logger/WinstonLogger";

let config: any = {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    dialectOptions: {decimalNumbers: true},
    timezone: process.env.DB_TIMEZONE,
    logging: (str: any) => {
        // 로깅 프린트 옵션이 있다면 적용한다
        if (process.env.LOG_PRINT == 'true') {
            Logger.debug(str);
        } else {
            console.log('SQL', str);
        }
    }
};

// 시퀄라이저 객체 생성
const sequel = new Sequelize(config);

// 모델 입력
sequel.addModels(Models);

// 쿼리 유틸
const query = new SequelizerUtil(sequel);

// 모델 작성
export const DB = {
    sequel: sequel,
    selectOne: query.selectOne,
    select: query.select,
    delete: query.delete,
    update: query.update,
    insert: query.insert,
};

// 데이터베이스 초기화
let syncConfig: SyncOptions = {
    alter: process.env.DB_ALTER == 'true',
    logging: process.env.DB_LOG == 'true',
    force: process.env.DB_FORCE == 'true'
};

export const DbSync = (callback?: () => void) => {
    console.log("Sequelize Connection", config);
    console.log("Sequelize Sync", syncConfig);
    DB.sequel.sync(syncConfig).then(value => {
        console.log("Sequelize Synchronized!");

        if (callback) {
            callback();
        }
    }).catch(reason => {
        console.log('데이터베이스 접속실패', reason);
        console.log('서버를 종료합니다');
        process.exit(0);
    });
};

