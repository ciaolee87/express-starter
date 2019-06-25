import * as path from "path";
import fs from "fs";
import dotEnv from "dotenv";

// 값이 지정되지 않았다면 초기값을 넣어준다
if (!(process.env.NODE_ENV)) {
    process.env.NODE_ENV = "development";
}

// 화면에 표시
console.log(`서버모드 ${process.env.NODE_ENV}`);

let EnvPath: string = "";
switch (process.env.NODE_ENV) {
    case "development" :
        EnvPath = path.join(__dirname, '../../../resources/config/.env');
        break;
    case "test":
        EnvPath = path.join(__dirname, '../../../resources/config/.envTest');
        break;
    case "production":
        EnvPath = path.join(__dirname, '../../../resources/config/.envProduction');
        break;
}

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
