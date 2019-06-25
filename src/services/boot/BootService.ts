import {DB} from "../../utils/sequelize/Sequelize";
import Logger from "../../utils/logger/WinstonLogger";

export const BootService = () => {
    let config: any = {
        alter: process.env.DB_ALTER,
        logging: process.env.DB_LOG,
        force: process.env.DB_FORCE
    };

    // 데이터베이스 초기화
    DB.sequel.sync(config).then(value => {
        Logger.debug("데이터베이스 접속완료");
    }).catch(reason => {
        Logger.debug('데이터베이스 접속실패', [reason]);
        Logger.debug('서버를 종료합니다');
        process.exit(0);
    });
};
