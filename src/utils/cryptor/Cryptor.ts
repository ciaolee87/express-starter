import crypto from "crypto";

export class Cryptor {
    static mkSalt(size?: number) {
        return size ? crypto.randomBytes(size).toString('base64')
            : crypto.randomBytes(64).toString('base64');
    }
}
