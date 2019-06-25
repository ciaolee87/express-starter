declare namespace Express {
	export interface Request {
		sessionInfo: {
			accountId: number,
			sessionId: number
		};
	}
}
