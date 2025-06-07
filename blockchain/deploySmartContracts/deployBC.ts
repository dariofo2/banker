import Web3 from "web3";
import buildings from "../artifacts/contracts/buildings.sol/Buildings.json";

const node=new Web3("http://localhost:8545");

const account=node.eth.accounts.privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

async function deployContract () {
    const contract=new node.eth.Contract(buildings.abi)
    const toDeploy=contract.deploy({
        data:buildings.bytecode
    });
    const estimateGas=await toDeploy.estimateGas({
        from:account.address
    })
    console.log("Estimated Gas" + estimateGas.toString());
    
    const tx=await toDeploy.send({
        from:account.address,
        gasPrice:(await node.eth.getGasPrice()).toString(),
    })

    console.log("Contract deployed at Address: "+ tx.options.address)
}

deployContract();






