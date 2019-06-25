import {Sequelize} from 'sequelize-typescript';
import {SequelizerUtil} from "./SequelizeUtil";
import {Models} from "../../models";
import {StackLogger} from "../logger/StackLogger";
import {SyncOptions} from "sequelize";
import {exitOnError} from "winston";

let config: any = {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: (str: any) => {
        StackLogger.stack(str);
    }
};

// 시퀄라이저 객체 생성
const sequel = new Sequelize(config);

// 모델 입력
sequel.addModels(Models);

// 쿼리 유틸
const query = new SequelizerUtil();

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
    alter: Boolean(process.env.DB_ALTER),
    logging: Boolean(process.env.DB_LOG),
    force: Boolean(process.env.DB_FORCE)
};

export const DbSync = () => {
    console.log("Sequelize Connection", config);
    console.log("Sequelize Sync", syncConfig);
    DB.sequel.sync(syncConfig).then(value => {
        console.log("Sequelize Synchronized!")
    }).catch(reason => {
        console.log('데이터베이스 접속실패', reason);
        console.log('서버를 종료합니다');
        process.exit(0);
    });
};

