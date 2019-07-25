export class ResCode {
    static c200: DefResCode = {code: 200, msg: "success"};
    static c403: DefResCode = {code: 403, msg: "fail-jwt-token-decode"};
    static c404: DefResCode = {code: 404, msg: "page-not-found"};
    static c500: DefResCode = {code: 500, msg: "server-error"};
    static c9950: DefResCode = {code: 9950, msg: "unsupported-client-version"};
}


export type DefResCode = {
    code: number,
    msg: string
}
