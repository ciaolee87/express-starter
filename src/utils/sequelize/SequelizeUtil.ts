import {StackLogger} from "../logger/StackLogger";
import camelcase = require("camelcase");
import {QueryOptions, QueryTypes} from "sequelize";
import {DB} from "./Sequelize";



export class SequelizerUtil {
    constructor() {
    }

    // 선택쿼리
    select<T>(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<Array<T>> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다

                if (!(options)) {
                    options.type = QueryTypes.SELECT
                }

                const raw = await DB.sequel.query(sql, options);

                // 첫번째 결과값만 사용한다
                const result = raw[0];

                let resArray = [];
                for (let rcd of result) {
                    let item: any = {};
                    for (let columnName in rcd) {
                        item[camelcase(columnName)] = rcd[columnName];
                    }
                    resArray.push(item);
                }

                StackLogger.stack("SQL", {sql: sql, options: options, result: resArray});
                resolve(resArray);
            } catch (e) {
                StackLogger.stack("SQL Fail", [sql, options, e]);
                reject(e);
            }
        });
    }

    // 선택쿼리
    selectOne<T>(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<T> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다
                if (!(options)) {
                    options.type = QueryTypes.SELECT
                }

                const raw = await DB.sequel.query(sql, options);

                const result: any = raw[0][0];

                // 결과값이 없으면 null 값을 반환한다
                if (result.length == 0) {
                    resolve(null);
                }

                let item: any = {};
                for (let name in result) {
                    const camelName = camelcase(name);
                    item[camelName] = result[name];
                }

                StackLogger.stack("SQL ", {sql: sql, options: options, result: item});
                resolve(item);
            } catch (e) {
                StackLogger.stack("SQL Fail", [sql, options, e]);
                reject(e);
            }
        });
    }

    // update 쿼리
    update(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<UDResult> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다
                if (!(options)) {
                    options.type = QueryTypes.UPDATE
                }

                const raw = await DB.sequel.query(sql, options);
                StackLogger.stack("SQL", {sql: sql, options: options, result: raw[0]});
                resolve(raw[0]);
            } catch (e) {
                StackLogger.stack("SQL Fail", [sql, options, e]);
                reject(e);
            }
        });
    }

    // delete 쿼리
    delete(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<UDResult> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다
                if (!(options)) {
                    options.type = QueryTypes.DELETE
                }

                const raw = await DB.sequel.query(sql, options);
                StackLogger.stack("SQL", {sql: sql, options: options, result: raw[0]});
                resolve(raw[0]);
            } catch (e) {
                StackLogger.stack("SQL Fail", [sql, options, e]);
                reject(e);
            }
        });
    }

    insert(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<number> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다
                if (!(options)) {
                    options.type = QueryTypes.INSERT
                }
                const raw = await DB.sequel.query(sql, options);
                StackLogger.stack("SQL", {sql: sql, options: options, result: raw[1]});
                resolve(raw[1]);
            } catch (e) {
                StackLogger.stack("SQL Fail", [sql, options, e]);
                reject(e);
            }
        });
    }
}


export interface UDResult {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number,
    changedRows: number
}
