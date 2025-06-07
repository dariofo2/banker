import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import Web3, { Bytes, eth, SignTransactionResult, Transaction, TransactionReceipt, Web3Account } from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

@Injectable()
export class Web3Service implements OnApplicationBootstrap {
    node:Web3<RegisteredSubscription>=new Web3(process.env.BLOCKCHAIN_NODE_URL);

    bankerAddress:string=process.env.BANKER_BLOCKCHAIN_ADDRESS;
    bankerPrivateKey:string=process.env.BANKER_BLOCKCHAIN_PRIVATE_KEY;
    bankerAccount:Web3Account=this.node.eth.accounts.privateKeyToAccount(this.bankerPrivateKey);

    //Make Connection At App Bootstrap
    onApplicationBootstrap() {
        //this.node=new Web3(process.env.BLOCKCHAIN_NODE_URL);
        this.node.eth.defaultAccount=this.bankerAddress;
        //this.bankerAccount=this.node.eth.accounts.privateKeyToAccount(this.bankerPrivateKey);
    }

    async getTransaction (hashTransaction:Bytes) {
        const getTransaction:Transaction=await this.node.eth.getTransaction(hashTransaction);
        console.log(getTransaction);
        
        return getTransaction;
    }

    async signBankerTransaction (to:string,value:number): Promise<SignTransactionResult> {
        const signedTransaction=await this.bankerAccount.signTransaction({
            from:this.bankerAddress,
            to: to,
            value: value,
            gasPrice : await this.getGasPrice()
        });
        
        return signedTransaction;
    }

    async sendSignedTransaction (signedTransaction:SignTransactionResult) :Promise<TransactionReceipt> {
        const transactionDone=await this.node.eth.sendSignedTransaction(signedTransaction.rawTransaction).on("sending",()=>{console.log("Enviando...")}).on("receipt",()=>{console.log("recibido")});
        return transactionDone;
    }


    async getGasPrice () {
        return (await this.node.eth.getGasPrice());
    }
    async getBankerBalance () {
        return (await this.node.eth.getBalance(this.bankerAddress)).toString();
    }
}