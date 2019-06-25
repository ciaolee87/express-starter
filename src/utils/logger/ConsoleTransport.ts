import {format, transports} from "winston";

export const ConsoleTransport = new transports.Console({
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD hh:mm:ss'
		}),
		format.colorize({all: true}),
		format.align(),
		format.printf((info) => {
			const {
				timestamp, level, message, ...args
			} = info;
			return `${message.trim()}${Object.keys(args).length ? ` : ${JSON.stringify(args)}` : ''}`;
		}))
});