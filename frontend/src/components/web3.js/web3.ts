import Web3 from "web3";

export class Web3Service {
    static node= new Web3(process.env.NEXT_PUBLIC_BLOCKCHAIN_NODE_URL);
    static bankerAddress=process.env.NEXT_PUBLIC_BANKER_BLOCKCHAIN_ADDRESS;
}