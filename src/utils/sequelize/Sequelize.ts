import {Sequelize} from 'sequelize-typescript';
import Logger from "../logger/WinstonLogger";
import {SequelizerUtil} from "./SequelizeUtil";
import {Models} from "../../models";
import {StackLogger} from "../logger/StackLogger";

let config: any = {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (str: any) => {
        StackLogger.stack(str);
    }
};

Logger.debug("데이터베이스 접속경로", [config]);

// 시퀄라이저 객체 생성
const sequel = new Sequelize(config);

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

// 모델 입력
sequel.addModels(Models);

