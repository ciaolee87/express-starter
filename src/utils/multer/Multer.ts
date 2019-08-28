import * as path from "path";
import uuid = require("uuid");
import * as fs from "fs";
import Logger from "../logger/WinstonLogger";
import {BizError} from "../../midwares/error/ErrorMidware";
import {ResCode} from "../../resCode/ResCode";

const multer = require('multer');


// 루트 폴더가 있는지 확인한다
let rootPath = path.join(process.env.UPLOAD_FILE_PATH);
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
        // 서버 기동시 최초 1번만 콜 한다
        let pathString = path.join(process.env.UPLOAD_FILE_PATH);
        if (!fs.existsSync(pathString)) {
            fs.mkdir(pathString, () => {
                Logger.debug("+- 파일 업로드 폴더 생성에 실패하였습니다");
                callback(new BizError(ResCode.c500), null);
            });
        }
        callback(null, pathString);
    },
    filename: (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        // 파일이 업로드 될때마다 콜된다.
        let fileName = uuid.v4();
        while (true) {
            if (!fs.existsSync(path.join(process.env.UPLOAD_FILE_PATH, fileName))) {
                break;
            }
            fileName = uuid.v4();
        }
        callback(null, fileName);
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
