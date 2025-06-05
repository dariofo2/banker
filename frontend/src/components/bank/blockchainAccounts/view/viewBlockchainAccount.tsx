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

export default function ViewBlockChainAccount(props: any) {
    const [blockChainAccountId,setBlockchainAccountId]=useState(Cookies.get("blockchainAccountId"));
    const [blockChainAccount,setBlockchainAccount]=useState(null as BlockchainAccounts|null);
    
    const [accountData, setAccountData] = useState(new BlockchainAccountData());
    const [buildings, setBuildings] = useState([] as BCBuilding[]);
    const [buildingsOnSale, setBuildingsOnSale] = useState([] as BCBuilding[]);

    const [contractMethodSendToSign,setContractMethodSendToSign]=useState({} as any);
    const [contractMethodValueSendToSign,setContractMethodValueSendToSign]=useState(0 as number);
    const [contractMethodEstimateGasSendToSign,setContractMethodEstimateGasSendToSign]=useState(0 as number);

    useEffect(() => {
        actualizarCuenta();
    }, []);

    useEffect(()=>{
        console.log("hola");
    },[buildings])

    async function actualizarCuenta() {
        const responseBlockChainAccount=await axiosFetchs.getBlockChainAccount({id:parseInt(blockChainAccountId as string)});
        
        setBlockchainAccount({...responseBlockChainAccount});

        const accData = new BlockchainAccountData();
        accData.address=responseBlockChainAccount.address;
        accData.buildingsTokens = await buildingsContract.getBuildings(responseBlockChainAccount.address as string);
        accData.buildingsOnSaleTokens = await buildingsContract.getBuildingsOnSale(responseBlockChainAccount.address as string);
        accData.coinBalance = await buildingsContract.getBalanceBS(responseBlockChainAccount.address as string);
        
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

    async function setSendContractMethod (contract:any,value:number) {
        setContractMethodSendToSign(contract);
        setContractMethodValueSendToSign(value);
        /*
        const estimateGas=await Web3Service.node.eth.estimateGas(
            {
                from:accountData.address,
                data:contract.encodeABI()
            }
        )
        setContractMethodEstimateGasSendToSign(parseInt(estimateGas.toString()));
        */
        showAcceptModal();
    } 

    async function acceptSignAndSendContractTransaction (privateKey:string) {
        console.log(privateKey);
        const accountToSign=Web3Service.node.eth.accounts.privateKeyToAccount(privateKey);
        const signedTransaction=await buildingsContract.signTransactionBCFromSendMethod(contractMethodSendToSign.encodeABI(),accountToSign,contractMethodValueSendToSign);
        
        await Web3Service.node.eth.sendSignedTransaction(signedTransaction.rawTransaction);

        actualizarCuenta();
    }

    async function showAcceptModal () {
        Modal.getOrCreateInstance("#acceptBlockChainSendModal").show();
    }

    const buildingsMap = buildings.map(x => {
        if (!x.onSale) {
            return <House
                key={parseInt(x.tokenId?.toString() as string)}
                color="green"
                building={x}
                onClickMethod={(contractMethod,value)=>{setSendContractMethod(contractMethod,value)}}
            >
            </House>
        } else {
            return <House
                key={parseInt(x.tokenId?.toString() as string)}
                color="red"
                building={x}
                onClickMethod={(contractMethod,value)=>{setSendContractMethod(contractMethod,value)}}
            >
            </House>
        }
    })

    const buildingsOnSaleMap = buildingsOnSale.map(x => {
        return <HouseOnSale
            key={parseInt(x.tokenId?.toString() as string)}
            building={x}
            onBuyClick={(contract,value)=>setSendContractMethod(contract,value)}
        >
        </HouseOnSale>

    })




    return (
        <div style={{backgroundColor:"whitesmoke"}}>
            
            <Account
                onCreateBuilding={(contract,value)=>setSendContractMethod(contract,value)}
                blockchainAccountData={accountData}
            ></Account>
            {buildingsMap}
            {buildingsOnSaleMap}
            <AcceptBlockchainSendModal acceptSend={(privateKey)=>{acceptSignAndSendContractTransaction(privateKey)}} amountToSend={contractMethodValueSendToSign} estimateGas={contractMethodEstimateGasSendToSign} blockChainAccount={blockChainAccount as BlockchainAccounts} />
        </div>
    );
}