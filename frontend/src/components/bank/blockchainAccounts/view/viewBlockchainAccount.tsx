"use client"

import { useEffect, useState } from "react";
import Account from "./blockchainAccountCardView";

import Cookies from "js-cookie";
import { BlockchainAccountData } from "@/components/classes/objects/BlockchainAccountData";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import HouseOnSale from "./blockchainHouseOnSale";
import House from "./blockchainHouse";
import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { Web3Service } from "@/components/web3.js/web3";
import { Modal } from "bootstrap";
import AcceptBlockchainSendModal from "./acceptBlockchainSendModal";
import TransferBlockchainAccountModal from "./transferBlockchainAccountView";
import DepositBlockchainAccountModal from "./depositBlockChainModal";
import { toast, ToastContainer } from "react-toastify";
import Loading from "@/components/loading/loading";
import SocketIOClient from "@/components/socket.io/socket.io";
import { Transaction } from "web3";

export default function ViewBlockChainAccount(props: any) {
    const [blockChainAccountId,setBlockchainAccountId]=useState(Cookies.get("blockchainAccountId"));
    const [blockChainAccount,setBlockchainAccount]=useState(null as BlockchainAccounts|null);
    
    const [accountData, setAccountData] = useState(new BlockchainAccountData());
    const [buildings, setBuildings] = useState([] as BCBuilding[]);
    const [buildingsOnSale, setBuildingsOnSale] = useState([] as BCBuilding[]);

    const [transactionToSign,setTransactionToSign]=useState({} as Transaction);
    const [transactionEstimateGas,setTransactionEstimateGas]=useState(0 as number);
    const [transactionEthCost, setTransactionEthCost]=useState("" as string);

    useEffect(() => {
        actualizarCuenta();
    }, []);

    async function actualizarCuenta() {
        const responseBlockChainAccount=await axiosFetchs.getBlockChainAccount({id:parseInt(blockChainAccountId as string)});
        
        setBlockchainAccount({...responseBlockChainAccount});

        const accData = new BlockchainAccountData();
        accData.address=responseBlockChainAccount.address;
        accData.buildingsTokens = await buildingsContract.getBuildings(responseBlockChainAccount.address as string);
        accData.buildingsOnSaleTokens = await buildingsContract.getBuildingsOnSale(responseBlockChainAccount.address as string);
        accData.coinBalance = (parseInt(await buildingsContract.getBalanceBS(responseBlockChainAccount.address as string))/100).toFixed(2);
        
        accData.coinContractBalance = await buildingsContract.getBalanceBsOfContract(responseBlockChainAccount.address as string);
        accData.etherBalance = await Web3Service.getBalanceEther(responseBlockChainAccount.address as string);
        accData.nameCoin = await buildingsContract.nameCoin(responseBlockChainAccount.address as string);
        accData.symbolCoin = await buildingsContract.symbolCoin(responseBlockChainAccount.address as string);
        console.log(accData)
        setAccountData({...accData});

        actualizarBuildings([...accData.buildingsTokens]);
        actualizarBuildingsOnSale([...accData.buildingsOnSaleTokens]);
    }

    async function actualizarBuildings(buildingsTokens: BigInt[]) {
        let buildingsObjetos = [];
        console.log(buildingsTokens);
        //
        //NO FUNCIONA EL BUCLE PORQUE EL OBJETO BUILDINGS TOKENS NO ES UN ARRAY NORMAL, NO TIENE LENGTH
        //
        for (let i = 0; i < buildingsTokens.length; i++) {
            const x:number = parseInt(buildingsTokens[i].toString());
            
            const building: BCBuilding = await buildingsContract.getBuilding(x,accountData.address as string);
            if (building.name!="") {
                building.tokenId = BigInt(x);
                console.log(building);
                buildingsObjetos.push(building);

            }
            
        }
        setBuildings([...buildingsObjetos]);
    }

    async function actualizarBuildingsOnSale(buildingsTokens: BigInt[]) {
        let buildingsObjetos = [];

        //
        //NO FUNCIONA EL BUCLE PORQUE EL OBJETO BUILDINGS TOKENS NO ES UN ARRAY NORMAL, NO TIENE LENGTH
        //
        
        for (let i = 0; i < buildingsTokens.length; i++) {
            const x = parseInt(buildingsTokens[i].toString());
            const building: BCBuilding = await buildingsContract.getBuilding(x,accountData.address as string);
            if (building.name!="") {
                building.tokenId = BigInt(x);
            
                buildingsObjetos.push(building);
            }
        }
        setBuildingsOnSale([...buildingsObjetos]);
    }

    async function setSendContractMethod (transaction:Transaction) {
        try {
            const estimateGas=await Web3Service.node.eth.estimateGas(transaction);
            setTransactionEstimateGas(parseInt(estimateGas.toString()));
            setTransactionToSign(transaction);
            setTransactionEthCost(Web3Service.node.utils.fromWei(transaction.value as number,"ether"));

            showAcceptModal();
        } catch {
            toast.error("Saldo Insuficiente",{containerId:"axios"})
        }
    } 

    async function acceptSignAndSendContractTransaction (privateKey:string) {
        try {
            const accountToSign=Web3Service.node.eth.accounts.privateKeyToAccount(privateKey);
            const signedTransaction=await Web3Service.node.eth.accounts.signTransaction(transactionToSign,accountToSign.privateKey);
            
            await Web3Service.node.eth.sendSignedTransaction(signedTransaction.rawTransaction);
            toast.success("Transferencia creada con Éxito",{containerId:"axios"});
            actualizarCuenta();
        } catch {
            toast.error("Error en la Transferencia",{containerId:"axios"});
        } 
    }

    async function showAcceptModal () {
        Modal.getOrCreateInstance("#acceptBlockChainSendModal").show();
    }

    async function showDepositModal () {
        Modal.getOrCreateInstance("#depositBlockchainModal").show();
    }
    async function showTransferModal () {
        Modal.getOrCreateInstance("#transferModal").show();
    }

    if (!blockChainAccount) return (<Loading />)
        
    const buildingsMap = buildings.map(x => {
        if (!x.onSale) {
            return <House
                key={parseInt(x.tokenId?.toString() as string)}
                blockchainAccount={blockChainAccount}
                color="green"
                building={x}
                onClickMethod={(transaction)=>{setSendContractMethod(transaction)}}
            >
            </House>
        } else {
            return <House
                key={parseInt(x.tokenId?.toString() as string)}
                blockchainAccount={blockChainAccount}
                color="red"
                building={x}
                onClickMethod={(transaction)=>{setSendContractMethod(transaction)}}
            >
            </House>
        }
    })

    const buildingsOnSaleMap = buildingsOnSale.map(x => {
        return <HouseOnSale
            key={parseInt(x.tokenId?.toString() as string)}
            blockchainAccount={blockChainAccount}
            building={x}
            onBuyClick={(contract)=>setSendContractMethod(contract)}
        >
        </HouseOnSale>

    })

    return (
        <div className="overflow-hidden" style={{backgroundColor:"whitesmoke"}}>
            <div className="container-fluid" style={{height:80, backgroundColor:"black"}}>

            </div>
            <Account
                onCreateBuilding={(transaction)=>setSendContractMethod(transaction)}
                blockchainAccountData={accountData}
                onClickTransferModalBtn={showTransferModal}
                onClickDepositModalBtn={showDepositModal}
            ></Account>
            <hr />
            
            <div className="container">
                <h5>Casas en Propiedad</h5>
                <div className="row">
                    {buildingsMap}
                </div>
            </div>

            <div className="container">
                <h5 className="text-center mt-4">Casas En Venta</h5>
                <div className="row">
                    {buildingsOnSaleMap}
                </div>
            </div>
            <AcceptBlockchainSendModal acceptSend={(privateKey)=>{acceptSignAndSendContractTransaction(privateKey)}} amountToSend={parseFloat(transactionEthCost)} estimateGas={transactionEstimateGas} blockChainAccount={blockChainAccount as BlockchainAccounts} />
            <TransferBlockchainAccountModal blockchainAccount={blockChainAccount as BlockchainAccounts} onSubmitModal={actualizarCuenta} />
            <DepositBlockchainAccountModal blockchainAccount={blockChainAccount as BlockchainAccounts} onSubmitModal={actualizarCuenta} />

            <SocketIOClient />
            <ToastContainer containerId="axios" position="top-center" />
        </div>
    );
}