import Logger from "./WinstonLogger";
import moment from "moment";

const BizLogger = (key :string, value: any) => {
    const log = {
        time: moment().format("yy-MM-dd hh:mm:ss"),
        key,
        log: value
    }
    Logger.debug(log);
}

export default BizLogger;
