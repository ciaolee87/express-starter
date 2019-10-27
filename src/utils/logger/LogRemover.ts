import {scheduleJob} from "node-schedule";
import moment from "moment";
import * as fs from "fs";
import {LineLogger} from "./LineLogger";
import * as path from "path";

// 매일 밤 0시에 30일 로그 삭제하기
const LogRemover = scheduleJob('* * 0 * * *', () => {

	LineLogger(`30일이 지난 로그를 삭제합니다`);

	const now = moment();
	const last = now.day(now.day() - 30);

	const fileName = process.env.LOG_PREFIX + '-' + last.format('YYYY-MM-DD') + '.log';
	const filePath = path.join(process.env.LOG_PATH, fileName);

	if (fs.existsSync(filePath)) {
		LineLogger(`${fileName} 삭제되었습니다`);
		fs.unlinkSync(filePath);
	}
	LineLogger(`다음 로그 삭제 스케줄 : ${LogRemover.nextInvocation()}`);
});

export default LogRemover;
