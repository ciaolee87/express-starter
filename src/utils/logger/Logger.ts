import Logger from "./WinstonLogger";
import moment from "moment";

const BizLogger = (key :string, value: any, requestId?: string) => {
    let log;
    if (requestId) {
        log = {
            time: moment().format("yy-MM-dd hh:mm:ss"),
            requestId,
            key,
            log: value
        }

    } else {
        log = {
            time: moment().format("YY-MM-DD hh:mm:ss"),
            key,
            log: value
        }
    }

    Logger.debug(JSON.stringify(log));
}

export default BizLogger;
