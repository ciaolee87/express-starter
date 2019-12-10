import * as path from "path";
import fs from "fs";
import dotEnv from "dotenv";

// 화면에 표시
console.log(`서버모드 ${process.env.NODE_ENV || 'default'}`);

// 초기값 입력하기
let EnvPath: string = path.join(__dirname, `../../../resources/config/.${process.env.NODE_ENV || 'env'}`);
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (fs.existsSync(EnvPath)) {
	const result = dotEnv.config({
		path: EnvPath,
		debug: true
	});

	// 기동모드 출력하기
	console.log('DotEnv 초기화 완료', [result]);
} else {
	console.log("DotEnv 파일 불러오기 실패");
	console.log("서버 종료");
	process.exit(0);
}

export default EnvPath;
