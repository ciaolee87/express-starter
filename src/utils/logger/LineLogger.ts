import Logger from "./WinstonLogger";

export const LineLogger = (log: string, args?: any) => {
    let time = Date.now();
    Logger.debug(`+ ${getDate(time)} ${log}`, args);
};


let getDate = (date?: number): string => {
    if (!date) {
        date = Date.now();
    }

    let now = new Date(date);

    return `${now.getHours()}:${now.getMinutes()} ${now.getSeconds()} ${now.getMilliseconds()}`
};
