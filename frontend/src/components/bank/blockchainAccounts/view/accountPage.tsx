"use client"

import { useEffect, useState } from "react";
import Account from "./account";

import Cookies from "js-cookie";
import { BlockchainAccountData } from "@/components/classes/objects/BlockchainAccountData";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import HouseOnSale from "./houseOnSale";
import House from "./house";
import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { Web3Service } from "@/components/web3.js/web3";

export default function BlockChainAccount(props: any) {
    const [blockChainAccountId,setBlockchainAccountId]=useState(Cookies.get("blockchainAccountId"));
    const [blockChainAccount,setBlockchainAccount]=useState(null as BlockchainAccounts|null);
    const [accountData, setAccountData] = useState(new BlockchainAccountData());
    const [buildings, setBuildings] = useState([] as BCBuilding[]);
    const [buildingsOnSale, setBuildingsOnSale] = useState([] as BCBuilding[]);

    useEffect(() => {
        actualizarCuenta();
    }, []);

    async function actualizarCuenta() {
        const responseBlockChainAccount=await axiosFetchs.getBlockChainAccount({id:parseInt(blockChainAccountId as string)});
        setBlockchainAccount({...responseBlockChainAccount});

        const accData = new BlockchainAccountData();
        accData.buildingsTokens = await buildingsContract.getBuildings() as number[];
        accData.buildingsOnSaleTokens = await buildingsContract.getBuildingsOnSale() as number[];
        accData.coinBalance = await buildingsContract.getBalanceBS(responseBlockChainAccount.address as string);
        accData.coinContractBalance = await buildingsContract.getBalanceBsOfContract();
        accData.etherBalance = await Web3Service.getBalanceEther(responseBlockChainAccount.address as string);
        accData.nameCoin = await buildingsContract.nameCoin();
        accData.symbolCoin = await buildingsContract.symbolCoin();
        
        setAccountData(accData);

        actualizarBuildings(accData.buildingsTokens);
        actualizarBuildingsOnSale(accData.buildingsOnSaleTokens);
    }

    async function actualizarBuildings(buildingsTokens: number[]) {
        let buildingsObjetos = [];

        for (let i = 0; i < buildingsTokens.length; i++) {
            const x:number = buildingsTokens[i];
            const building: BCBuilding = await buildingsContract.getBuilding(x);
            if (building.name!="") {
                building.tokenId = x;
                console.log(building.onSale);
                buildingsObjetos.push(building);

            }
            
        }
        setBuildings(buildingsObjetos);
    }

    async function actualizarBuildingsOnSale(buildingsTokens: number[]) {
        let buildingsObjetos = [];

        for (let i = 0; i < buildingsTokens.length; i++) {
            const x = buildingsTokens[i];
            const building: BCBuilding = await buildingsContract.getBuilding(x);
            if (building.name!="") {
                building.tokenId = x;
            
                buildingsObjetos.push(building);
            }
        }
        setBuildingsOnSale(buildingsObjetos);
    }

    const buildingsMap = buildings.map(x => {
        if (!x.onSale) {
            return <House
                key={x.tokenId}
                color="green"
                name={x.name}
                level={x.level}
                timeFromSpend={x.timeFromSpend}
                owner={x.owner}
                onSale={x.onSale}
                value={x.value}
                tokenId={x.tokenId}
                buildsContract={buildingsContract}
            >
            </House>
        } else {
            return <House
                key={x.tokenId}
                color="red"
                name={x.name}
                level={x.level}
                timeFromSpend={x.timeFromSpend}
                owner={x.owner}
                onSale={x.onSale}
                value={x.value}
                tokenId={x.tokenId}
                buildsContract={buildingsContract}
            >
            </House>
        }
    })

    const buildingsOnSaleMap = buildingsOnSale.map(x => {
        return <HouseOnSale
            key={x.tokenId}
            building={x}
        >
        </HouseOnSale>

    })




    return (
        <div style={{backgroundColor:"whitesmoke"}}>
            <Account
                buildsContract={buildingsContract}
                address={accountData.address}
                ethereumBalance={accountData.etherBalance}
                symbol={accountData.symbolCoin}
                coinBalance={accountData.coinBalance}
                coinContractBalance={accountData.coinContractBalance}
                buildings={buildingsMap}
                buildingsOnSale={buildingsOnSaleMap}

            ></Account>
        </div>
    );
}