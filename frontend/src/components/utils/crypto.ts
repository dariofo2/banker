import { createHash } from "crypto";

export class CryptoUtils {
    static async checkPasswordsEqual (password:string,password2:string) {
        return (password===password2);
    }

    static async hashPasswordToSha256 (password:string) {
        return createHash("sha256").update(password).digest("base64");
    }
}