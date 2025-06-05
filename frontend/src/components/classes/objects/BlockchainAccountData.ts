import { BCBuilding } from "./BCBuilding";

export class BlockchainAccountData {
    address?:string;
    etherBalance?:string;
    nameCoin?:string;
    symbolCoin?:string;
    coinBalance?:string;
    coinContractBalance?:string;
    buildingsTokens?:BigInt[];
    buildingsOnSaleTokens?:BigInt[];
}