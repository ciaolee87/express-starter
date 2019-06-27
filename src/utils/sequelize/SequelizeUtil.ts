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

                // 옵션이 없으면 추가하기
                if (!(options)) {
                    options = {
                        type: QueryTypes.SELECT
                    };
                } else {
                    options.type = QueryTypes.SELECT;
                }

                const result = await DB.sequel.query(sql, options);

                let resArray = [];
                for (let rcd of result) {
                    let item: any = {};
                    for (let columnName in rcd) {
                        item[camelcase(columnName)] = rcd[columnName];
                    }
                    resArray.push(item);
                }
                resolve(resArray);
            } catch (e) {
                reject(e);
            }
        });
    }

    // 선택쿼리
    selectOne<T>(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<T> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다

                // 옵션이 없으면 추가하기
                if (!(options)) {
                    options = {
                        type: QueryTypes.SELECT
                    };
                } else {
                    options.type = QueryTypes.SELECT;
                }

                const result = await DB.sequel.query(sql, options);

                // 결과값이 없으면 null 값을 반환한다
                if (result.length == 0) {
                    resolve(null);
                }

                let item: any = {};
                for (let name in result) {
                    const camelName = camelcase(name);
                    item[camelName] = result[name];
                }
                resolve(item);
            } catch (e) {
                reject(e);
            }
        });
    }

    // update 쿼리
    update(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<UDResult> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다
                // 옵션이 없으면 추가하기
                if (!(options)) {
                    options = {
                        type: QueryTypes.UPDATE
                    };
                } else {
                    options.type = QueryTypes.UPDATE;
                }

                const raw = await DB.sequel.query(sql, options);
                resolve(raw);
            } catch (e) {
                reject(e);
            }
        });
    }

    // delete 쿼리
    delete(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<UDResult> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다
                // 옵션이 없으면 추가하기
                if (!(options)) {
                    options = {
                        type: QueryTypes.DELETE
                    };
                } else {
                    options.type = QueryTypes.DELETE;
                }

                const raw = await DB.sequel.query(sql, options);
                // Logger.debug("SQL", {sql: sql, options: options, result: raw[0]});
                resolve(raw);
            } catch (e) {
                // Logger.debug("SQL Fail", [sql, options, e]);
                reject(e);
            }
        });
    }

    insert(sql: string | { query: string, values: any[] }, options?: QueryOptions | any): Promise<number> {
        return new Promise<any>(async (resolve, reject) => {
            try { // 쿼리를 실행한다
                // 옵션이 없으면 추가하기
                if (!(options)) {
                    options = {
                        type: QueryTypes.INSERT
                    };
                } else {
                    options.type = QueryTypes.INSERT;
                }
                const raw = await DB.sequel.query(sql, options);
                resolve(raw);
            } catch (e) {
                // Logger.debug("SQL Fail", [sql, options, e]);
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
