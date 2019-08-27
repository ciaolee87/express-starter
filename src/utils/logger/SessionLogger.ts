import Logger from "./WinstonLogger";
import {Subject} from "rxjs";

export class SessionLogger {
    private logStackList: Array<LogStack>;
    private subject: Subject<LogStack>;

    constructor() {
        this.subject = new Subject<LogStack>();
        this.logStackList = [];
        this.subject.subscribe(value => {
            this.logStackList.push(value);
        })
    }

    createLogger(section?: string): SectionLogger {
        if (section) {
            this.subject.next({
                time: new Date(),
                msg: section
            })
        }

        return (msg: any, args?: any) => {
            this.subject.next({
                time: new Date(),
                msg: msg,
                args: args
            })
        };
    }

    log(msg: any, args?: any) {
        this.subject.next({
            time: new Date(),
            msg: msg,
            args: args
        })
    }

    flush(): void {
        Logger.debug('+ Session logging start');

        for (let log of this.logStackList) {
            if ((log.args instanceof Object) ||
                (log.args instanceof Array)) {
                Logger.debug(`| ${this.getDate(log.time)} ${log.msg}`, log.args);
            } else {
                Logger.debug(`| ${this.getDate(log.time)} ${log.msg}`, [log.args]);
            }

        }
        Logger.debug('+ Session logging end\n\n');
    }

    private getDate(date: Date): string {
        return `${date.getHours()}:${date.getMinutes()} ${date.getSeconds()} ${date.getMilliseconds()}`;
    }
}


export type SectionLogger = (msg: any, args?: any) => void

export interface LogStack {
    time: Date;
    msg: any;
    args?: any;
}
