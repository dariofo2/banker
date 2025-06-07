import { Module } from "@nestjs/common";
import { Web3Service } from "./web3.service";
import { BuildingsContractService } from "./buildingsContract.service";

@Module({
    providers:[Web3Service,BuildingsContractService],
    exports:[Web3Service,BuildingsContractService]
})
export class Web3Module {}