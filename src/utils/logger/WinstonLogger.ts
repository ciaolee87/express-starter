import winston from 'winston';

import fs from 'fs';
import {ConsoleTransport} from "./ConsoleTransport";
import {DailyTransport} from "./DailyTransport";
import * as path from "path";

// 로거 단계
// 0: error
// 1: warn
// 2: info
// 3: verbose
// 4: debug
// 5: silly

// 로그 파일 저장할 폴더 만들기
const logPath = path.join(__dirname, process.env.LOG_PATH);
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

// 로거 생성
const env = process.env.NODE_ENV;
let outs = [];
outs.push(DailyTransport);

// 테스트나 개발시 콘솔에 메시지를 표시한다
if (env == 'development' || env == "test") {
    outs.push(ConsoleTransport);
}

// 로거 객체 생성
const Logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    transports: outs
});

export default Logger;
