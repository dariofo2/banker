import Web3 from "web3";
import buildings from "../artifacts/contracts/buildings.sol/Buildings.json";

const node=new Web3("http://localhost:8545");

const account=node.eth.accounts.privateKeyToAccount("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e");

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






