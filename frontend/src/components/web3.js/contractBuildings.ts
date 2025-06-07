import { Contract, ContractAbi, Web3, Web3Account } from "web3";
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
static async transferTo(to:string,value:number) {
    return this.contractBuildings.methods.transfer(to,value);
}




// FUNCTIONS TO ACCESS CONTRACT
static async createBuilding(buildingName:string) {
    //const resp =await this.contractBuildings.methods.createBuilding(buildingName).send({ from: account, value: "1000000000000000000" });
    
    //console.log(resp);
    return this.contractBuildings.methods.createBuilding(buildingName);
    //return resp;
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

static async upLevelBuilding(tokenId:number) {
    //const resp = await this.contractBuildings.methods.upLevelBuilding(tokenId).send({ from: this.account.address, value: "1000000000000000000" });

    return this.contractBuildings.methods.upLevelBuilding(tokenId)
    //return resp;
}

static async payloadBuilding(tokenId:number) {
    //const resp = await this.contractBuildings.methods.payLoadBuilding(tokenId).send();
    return this.contractBuildings.methods.payLoadBuilding(tokenId);
    //return resp;
}


// BUY/SELL Buildings METHODS
static async putBuildingOnSale(tokenId:number, value:number) {
    //const resp = await this.contractBuildings.methods.putBuildingOnSale(tokenId, value).send();
    //console.log(resp);
    return this.contractBuildings.methods.putBuildingOnSale(tokenId, value)
    //return resp;
}

static async transferBuyBuilding(tokenId:number) {
    //const resp = await this.contractBuildings.methods.transferBuyBuilding(tokenId).send();
    return this.contractBuildings.methods.transferBuyBuilding(tokenId);
    //console.log(resp);
    //return resp;
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
/*
// ETHEREUM BALANCE
async function getBalanceEther (accountAddress) {
    const wei=await web3.eth.getBalance(accountAddress);
    const eth=await web3.utils.fromWei(wei,"ether");
    console.log(eth);
    return eth;
}



// ERC20 BS COIN BALANCE
async function getBalanceBS (accountAddress) {
    const balance= await contractBuildings.methods.balanceOf(accountAddress).call();
    console.log(balance);
    return balance;
}

async function getBalanceBsOfContract() {
    const balance= await contractBuildings.methods.balanceOf(contractAddress).call();
    console.log(balance);
    return balance;
}

//ERC20 BS COIN DATA 
async function nameCoin() {
    const name=await contractBuildings.methods.name().call();
    console.log(name);
    return name;
}

async function symbolCoin() {
    const symbol=await contractBuildings.methods.symbol().call();
    console.log(symbol);
    return symbol;
}






// FUNCTIONS TO ACCESS CONTRACT
async function createBuilding (accountAddress) {
    const resp = await contractBuildings.methods.createBuilding("Edificio Central").send({from:accountAddress,value:1000000000000000000});
    //console.log(resp);
    return resp;
}

async function getBuildings () {
    const resp=await contractBuildings.methods.getBuildingsTokenIdsFromAddress().call();
    console.log(resp);
    return resp;
}

async function getBuilding (tokenId) {
    const resp=await contractBuildings.methods.getBuilding(tokenId).call()
    console.log(resp);
    return resp;
}

async function upLevelBuilding (tokenId,accountAddress) {
    const resp= await contractBuildings.methods.upLevelBuilding(tokenId).send({from:accountAddress,value:1000000000000000000});
    return resp;
}

async function payloadBuilding (tokenId) {
    const resp = await contractBuildings.methods.payLoadBuilding(tokenId).send();
    return resp;
}


// BUY/SELL Buildings METHODS
async function putBuildingOnSale (tokenId,value) {
    const resp= await contractBuildings.methods.putBuildingOnSale(tokenId,value).send();
    //console.log(resp);
    return resp;
}

async function transferBuyBuilding (tokenId) {
    const resp= await contractBuildings.methods.transferBuyBuilding(tokenId).send();
    //console.log(resp);
    return resp;
}

async function getBuildingsOnSale () {
    const resp= await contractBuildings.methods.getBuildingsOnSale().call();
    console.log(resp);
    return resp;
}

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