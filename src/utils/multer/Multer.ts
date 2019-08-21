import * as path from "path";
import uuid = require("uuid");
import * as fs from "fs";
import Logger from "../logger/WinstonLogger";
import {BizError} from "../../midwares/error/ErrorMidware";
import {UploadFile} from "../../models/UploadFile";
import {ResCode} from "../../resCode/ResCode";

const multer = require('multer');
const dateFormat = require('dateformat');


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
        let pathString = path.join(__dirname, process.env.UPLOAD_FILE_PATH, dateFormat(now, "yymmdd"));
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
            if (!fs.existsSync(path.join(__dirname, process.env.UPLOAD_FILE_PATH, dateFormat(now, "yymmdd"), filePath))) {
                break;
            }
        }

        // 세션 정보가 있다면 데이터를 생성한다
        if ((req.user.sessionId) && (req.user.accountId)) {
            UploadFile.create({
                userId: req.user.accountId,
                filePath: filePath,
                fileSize: file.size,
                fieldName: file.fieldname
            }).then(value => {
                callback(null, filePath);
            })
        } else {
            // 세션정보가 없다면 에러처리
            callback(new BizError(ResCode.c401), null);
        }
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
