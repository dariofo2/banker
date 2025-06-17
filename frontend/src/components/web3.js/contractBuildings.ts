import { Contract, ContractAbi, HexString, Transaction, Web3, Web3Account } from "web3";
//import fs from "fs";
import jsonBuildings from "./Buildings.json" with {type:"json"};
import { Web3Service } from "./web3";
import { BCBuilding } from "../classes/objects/BCBuilding";


export class buildingsContract {
    static node:Web3=Web3Service.node;
    static contractBuildingsAddress=process.env.NEXT_PUBLIC_BLOCKCHAIN_BUILDINGS_CONTRACT_ADDRESS;
    static contractBuildings:Contract<ContractAbi>=new this.node.eth.Contract(jsonBuildings.abi,this.contractBuildingsAddress);


// SIGN A BC Transaction On Smart Contract
static async signTransactionBCFromSendMethod (contractSendABIEncode:string,account:Web3Account,value?:number) {
    const signedTransaction=await this.node.eth.accounts.signTransaction({
        from: account.address,
        to: this.contractBuildingsAddress,
        value: value ?? 0,
        data:contractSendABIEncode,
        gasPrice:await this.node.eth.getGasPrice()
    },account.privateKey)

    return signedTransaction;
}


// ERC20 BS COIN BALANCE
static async getBalanceBS(address:string) {
    const balance = await this.contractBuildings.methods.balanceOf(address).call({from:address}) as string;
    console.log(balance);
    return balance;
}

static async getBalanceBsOfContract(address:string) {
    const balance = await this.contractBuildings.methods.balanceOf(this.contractBuildingsAddress).call({from:address}) as string;
    console.log(balance);
    return balance;
}

//ERC20 BS COIN DATA 
static async nameCoin(address:string) {
    const name = await this.contractBuildings.methods.name().call({from:address}) as string;
    console.log(name);
    return name;
}

static async symbolCoin(address:string) {
    const symbol = await this.contractBuildings.methods.symbol().call({from:address}) as string;
    console.log(symbol);
    return symbol;
}




// TRANSFER TOKEN
/*
static async transferTo(to:string,value:number) {
    return this.contractBuildings.methods.transfer(to,value);
}
*/

static async transferTo(from:string,to:string,value:number) : Promise<Transaction>{
    const method=this.contractBuildings.methods.transfer(to,value).encodeABI();
    const transaction=await this.createTransactionFromMethodAndValue(from,method);
    return transaction;
}

static async createTransactionFromMethodAndValue(from:string,method:HexString,value:number=0) : Promise<Transaction> {
    const transaction:Transaction = {
        from: from,
        to: this.contractBuildingsAddress,
        value: value,
        data: method,
        gasPrice: await this.node.eth.getGasPrice()
    }
    return transaction;
}




// FUNCTIONS TO ACCESS CONTRACT
static async createBuilding(from:string, buildingName: string) : Promise<Transaction> {
    const method=this.contractBuildings.methods.createBuilding(buildingName).encodeABI();
    const transaction= await this.createTransactionFromMethodAndValue(from,method,1000000000000000000);
    return transaction
}

static async getBuildings(address:string) : Promise<BigInt[]> {
    const resp = await this.contractBuildings.methods.getBuildingsTokenIdsFromAddress().call({from:address}) as BigInt[];
    
    //console.log(resp);
    return resp;
}

static async getBuilding(tokenId:number,address:string) : Promise<BCBuilding> {
    const resp = await this.contractBuildings.methods.getBuilding(tokenId).call({from:address}) as BCBuilding;
    //console.log(resp);
    //console.log(resp);
    return resp;
}

static async upLevelBuilding(from:string, tokenId: number) : Promise<Transaction> {
    const method=this.contractBuildings.methods.upLevelBuilding(tokenId).encodeABI();
    const transaction= await this.createTransactionFromMethodAndValue(from,method,1000000000000000000);
    return transaction;
}

static async payloadBuilding(from:string, tokenId: number) : Promise<Transaction> {
    const method=this.contractBuildings.methods.payLoadBuilding(tokenId).encodeABI();
    const transaction= await this.createTransactionFromMethodAndValue(from,method);
    return transaction;
}


// BUY/SELL Buildings METHODS
static async putBuildingOnSale(from:string, tokenId: number, value:number) : Promise<Transaction> {
    const method=this.contractBuildings.methods.putBuildingOnSale(tokenId, value).encodeABI();
    const transaction= await this.createTransactionFromMethodAndValue(from,method);
    return transaction;
}


static async transferBuyBuilding(from:string, tokenId: number) : Promise<Transaction> {
    const method=this.contractBuildings.methods.transferBuyBuilding(tokenId).encodeABI();
    const transaction= await this.createTransactionFromMethodAndValue(from,method);
    return transaction;
}


static async getBuildingsOnSale(address:string) : Promise<BigInt[]> {
    const resp = await this.contractBuildings.methods.getBuildingsOnSale().call({from:address}) as BigInt[];
    
    return resp;
}

//  GET GAS COSTS
static async gasTransferBuyBuilding () {
    const gas =await this.contractBuildings.methods.transferBuyBuilding().estimateGas();
}
}

/* T E S T I N G    P U R P O S E S
//Buildings
createBuilding(account.address);
//getBuildings();
getBuilding(1);
upLevelBuilding(1,account.address);
payloadBuilding(1);

//Sell/Buy Buildings
putBuildingOnSale(1,50);
//transferBuyBuilding(1,accountMain.address);
getBuildingsOnSale();

//Get Balances
//Ether
getBalanceEther(account.address);
//ERC20 Coin
getBalanceBS(account.address);
getBalanceBsOfContract();

//ERC20 Coin Name and Symbol
nameCoin();
symbolCoin();

*/