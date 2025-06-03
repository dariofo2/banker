"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const Buildings_json_1 = __importDefault(require("../artifacts/contracts/buildings.sol/Buildings.json"));
const node = new web3_1.default("http://localhost:8545");
const account = node.eth.accounts.privateKeyToAccount("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e");
async function deployContract() {
    const contract = new node.eth.Contract(Buildings_json_1.default.abi);
    const toDeploy = contract.deploy({
        data: Buildings_json_1.default.bytecode
    });
    const estimateGas = await toDeploy.estimateGas({
        from: account.address
    });
    console.log("Estimated Gas" + estimateGas.toString());
    const tx = await toDeploy.send({
        from: account.address,
        gasPrice: (await node.eth.getGasPrice()).toString(),
    });
    console.log("Contract deployed at Address: " + tx.options.address);
}
deployContract();
