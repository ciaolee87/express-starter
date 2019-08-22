import * as path from "path";
import uuid = require("uuid");
import * as fs from "fs";
import Logger from "../logger/WinstonLogger";
import {BizError} from "../../midwares/error/ErrorMidware";
import {UploadFile} from "../../models/UploadFile";
import {ResCode} from "../../resCode/ResCode";

const multer = require('multer');
const dateFormat = require('dateformat');

// yymmdd 포멧으로 지정, yymm의 경우 1달에 한번 폴더 이름이 바뀜
const dirDatePathType = 'yymm';


// 루트 폴더가 있는지 확인한다
let rootPath = path.join(__dirname, process.env.UPLOAD_FILE_PATH);
if (!fs.existsSync(rootPath)) {
    fs.mkdir(rootPath, () => {
        Logger.debug("+- 파일 업로드 폴더 생성에 실패하였습니다");
        Logger.debug("+- 서버가 종료 됩니다");
        process.exit(1);
    });
}

// 저장 옵션
const diskStorage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {

        let now = new Date();  // 서버시간을 가저온다

        // 개발모드에서는 상대경로, 테스트나 운영 버전의 경로 절대경로로 지정한다
        let pathString = process.env.NODE_ENV === 'development' ?
            path.join(__dirname, process.env.UPLOAD_FILE_PATH, dateFormat(now, dirDatePathType)) :
            path.join(process.env.UPLOAD_FILE_PATH, dateFormat(now, dirDatePathType));

        if (!fs.existsSync(pathString)) {
            fs.mkdir(pathString, () => {
                Logger.debug("+- 파일 업로드 폴더 생성에 실패하였습니다");
                callback(new BizError(ResCode.c500), null);
            });
        }
        callback(null, pathString);
    },
    filename: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        let filePath = "";
        let now = new Date();  // 서버시간을 가저온다

        while (true) {
            filePath = uuid.v4();
            if (!fs.existsSync(path.join(__dirname, process.env.UPLOAD_FILE_PATH, dateFormat(now, dirDatePathType), filePath))) {
                break;
            }
        }
        callback(null, filePath);
    }
});

const MulterMidware = multer({
    storage: diskStorage,
    limits: {
        fileSize: Number(process.env.UPLOAD_FILE_MAX_BYTE_SIZE)
    },
    fileFilter: (req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), acceptFile: boolean) => void) => {
        let fileName = file.originalname.split(".");
        let extension = fileName[fileName.length - 1].toLowerCase();

        if (process.env.UPLOAD_FILE_FILTER.split("|").find(value => {
            return value == extension;
        })) {
            // 유효한 파일
            callback(null, true);
        } else {
            // 유효하지 않은 파일
            callback(new BizError(ResCode.c500), false);
        }
    }
});


export default MulterMidware;
