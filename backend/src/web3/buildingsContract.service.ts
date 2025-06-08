import { Injectable } from "@nestjs/common";
import { Web3Service } from "./web3.service";
import * as buildings from "../web3/Buildings.json";
import { Transaction } from "web3";

@Injectable()
export class BuildingsContractService {
    constructor(
        private readonly web3Service: Web3Service
    ) { }

    node = this.web3Service.node;
    contractAddress = process.env.BLOCKCHAIN_BUILDINGS_CONTRACT_ADDRESS;
    contract = new this.web3Service.node.eth.Contract(buildings.abi, this.contractAddress);


    async transfer(to: string, amount: number) {
        return this.contract.methods.transfer(to, amount);
    }

    async decodeMethodAndParametersOfSend(transaction: Transaction) {
        return this.contract.decodeMethodData(transaction.data.toString())
        
    }

    async getTotalSuply () {
        return await this.contract.methods.totalSupply().call()
    }
}