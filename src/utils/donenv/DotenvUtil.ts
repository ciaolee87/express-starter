import * as path from "path";
import fs from "fs";
import Logger from "../logger/WinstonLogger";
import dotEnv from "dotenv";

let envPath: string = "";
switch (process.env.NODE_ENV) {
    case "development" :
        envPath = path.join(__dirname, '../../../resources/config/.env');
        break;
    case "test":
        envPath = path.join(__dirname, '../../../resources/config/.envTest');
        break;
    case "production":
        envPath = path.join(__dirname, '../../../resources/config/.envProduction');
        break;
}

export const LoadDotenv = () => {
    const isExist = fs.existsSync(envPath);

    if (isExist) {
        const result = dotEnv.config({
            path: envPath,
            debug: true
        });

        // 기동모드 출력하기
        Logger.debug(`서버모드 ${process.env.NODE_ENV}`);
        Logger.debug('DotEnv 초기화 완료', [result]);
    } else {
        Logger.debug("서버 종료");
        process.exit(0);
    }
};
