import { createHash } from "crypto";
import { AES, enc, SHA256 } from "crypto-js";

export class CryptoUtils {
    static checkPasswordsEqual (password:string,password2:string) {
        return (password===password2);
    }

    static hashPasswordToSha256 (password:string) : string {
        return SHA256(password).toString();
        //return createHash("sha256").update(password).digest("base64");
    }

    static encryptAES2Factor (text:string,key1:string,key2:string) {
        const encryption1=AES.encrypt(text,key1).toString();
        const encryption2=AES.encrypt(encryption1,key2).toString();
        return encryption2;
    }

    static decryptAES2Factor (cipherText:string,key1:string,key2:string) {
        const encryption2=AES.decrypt(cipherText,key2).toString(enc.Utf8);
        const encryption1=AES.decrypt(encryption2,key1).toString(enc.Utf8);
        return encryption1;
    }
}