import { Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

@Injectable()
export class CryptoService {
    async encrypt (data:string,password:string) : Promise<string> {
        const iv=randomBytes(16);

        const key=await (promisify(scrypt)(password,"salt",32)) as Buffer;

        const cipher= createCipheriv("aes-256-ctr",key,iv);

        const encryptedText= Buffer.concat([
            cipher.update(data),
            cipher.final()
        ]);

        const hexEncryptedIvAndText = iv.toString("hex")+encryptedText.toString("hex");
        return hexEncryptedIvAndText;
    }

    async decrypt (data:string,password:string) {
        const iv=data.slice(0,32);
        const encryptedText=data.slice(32);

        const key=await (promisify(scrypt)(password,"salt",32)) as Buffer;

        const decipher=createDecipheriv("aes-256-ctr",key,Buffer.from(iv,"hex"));

        const decryptedText= Buffer.concat([
            decipher.update(Buffer.from(encryptedText,"hex")),
            decipher.final()
        ]);

        const decryptedTextFinal=decryptedText.toString();
        return decryptedTextFinal;
    }
}