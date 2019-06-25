import DailyRotateFile from 'winston-daily-rotate-file';
import {format} from "winston";

export const DailyTransport = new DailyRotateFile({
	level: 'debug',
	datePattern: 'YYYY-MM-DD',
	dirname: './logs',
	filename: `%DATE%.log`,
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD hh:mm:ss'
		}),
		format.align(),
		format.printf((info) => {
			const {
				timestamp, level, message, ...args
			} = info;


			// const ts = timestamp.slice(0, 19).replace('T', ' ')

			return `${message.trim()}${Object.keys(args).length ? ` : ${JSON.stringify(args)}` : ''}`;
		}))
});

