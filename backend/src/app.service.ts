import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { promisify } from 'util';
import { CryptoService } from './crypto/crypto.service';
import { BullMQClientService } from './bullMQ/bullMQClient.service';
import { CeleryClientService } from './celery/celeryclient.service';
import { CeleryWorkerService } from './celery/celeryWorker.service';
import { Web3Service } from './web3/web3.service';

@Injectable()
export class AppService {
  constructor (
    private readonly cryptoService: CryptoService,
    private readonly bullMQClientService: BullMQClientService,
    private readonly web3Service: Web3Service
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
    const transaction= (await this.web3Service.signBankerTransaction("0x70997970C51812dc3A010C7d01b50e0d17dc79C8",1000));
    return (await this.web3Service.getTransaction(transaction.transactionHash)).value.toString();
    //return await this.web3Service.getGasPrice();
   //return await this.bullMQClientService.addJobGenerateAccountNumber();
  }
}
