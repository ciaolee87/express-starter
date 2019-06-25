declare namespace Express {
	export interface Response {
		// 클라이언트 응답 기능
		bizSend(value?: { code?: number, body?: any }): Response;
	}
}


