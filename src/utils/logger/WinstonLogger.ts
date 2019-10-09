import winston from 'winston';

import fs from 'fs';
import {ConsoleTransport} from "./ConsoleTransport";
import {DailyTransport} from "./DailyTransport";

// 로거 단계
// 0: error
// 1: warn
// 2: info
// 3: verbose
// 4: debug
// 5: silly

// 로그 파일 저장할 폴더 만들기
const logPath = process.env.LOG_PATH;
if (!fs.existsSync(logPath)) {
	fs.mkdirSync(logPath);
}

// 로거 생성
let outs = [];
outs.push(DailyTransport);
outs.push(ConsoleTransport);

// 로거 객체 생성
const Logger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'debug',
	transports: outs
});

export default Logger;
