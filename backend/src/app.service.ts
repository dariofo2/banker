import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { CryptoService } from './crypto/crypto.service';
import { BullMQClientService } from './bullMQ/bullMQClient.service';
import { CeleryClientService } from './celery/celeryclient.service';
import { CeleryWorkerService } from './celery/celeryWorker.service';

@Injectable()
export class AppService {
  constructor (
    private readonly cryptoService: CryptoService,
    private readonly bullMQClientService: BullMQClientService,
    private readonly celeryClient: CeleryClientService,
    private readonly celeryWorker: CeleryWorkerService,
  ) {}
  async getHello(): Promise<string> {
    //const hashB=await bcrypt.hash("holaaa",10);
    /*
    const iv=crypto.randomBytes(16);
    const password="abc123.";
    
    const key=(await promisify(crypto.scrypt)(password,"salt",32)) as Buffer;
    
    const cipher=crypto.createCipheriv("aes-256-cbc",key,iv);

    const textToEncrypt="Nest";
    const encryptPrivateKey=Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final()
    ])
      

    const encrypted=iv.toString("hex")+encryptPrivateKey.toString("hex");
    console.log(iv.toString("hex").length);

    const ivDecrypt=encrypted.slice(0,32);
    const encryptedString=encrypted.slice(32);

    const decipher=crypto.createDecipheriv("aes-256-cbc",key,Buffer.from(ivDecrypt,"hex"));
    
    const decryptedText=Buffer.concat([
      decipher.update(Buffer.from(encryptedString,"hex")),
      decipher.final()
    ])
      
    
      
    console.log(decryptedText.toString());
    */
    /*
    const encrypted=await this.cryptoService.encrypt("Mis amigos","abc123.","hola");
    console.log(encrypted);
    const decrypted=await this.cryptoService.decrypt(encrypted,"abc123.","hola");
    console.log(decrypted);
    return "hola";
    */
   

    //await this.celeryWorker.registerAdd();
    //await this.celeryWorker.registerAdd();
    //await this.celeryClient.createTask();
   return await this.bullMQClientService.addJob();
  }
}
