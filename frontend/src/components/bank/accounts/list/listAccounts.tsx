"use client"

import { Accounts } from "@/components/classes/entity/accounts.entity";
import { axiosFetchs } from "@/components/utils/axios"
import { Modal } from "bootstrap";
import { useEffect, useState } from "react";
import CreateAccountModal from "./createAccountModal";
import CreateBlockchainAccountModal from "./createBlockChainAccountModal";
import { ToastContainer } from "react-toastify";
import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import AccountCardList from "./accountListCard";
import BlockchainAccountCardList from "./blockchainAccountListCard";

export default function ListAccounts () {
    const [accounts,setAccounts]=useState(null as Accounts[]|null);
    const [blockChainAccounts,setBlockChainAccounts] = useState(null as BlockchainAccounts[]|null);
    const [accountToUpdate,setAccountToUpdate]=useState(null as Accounts|null);

    useEffect(()=>{
        getAccounts();
        getBlockChainAccounts();
    },[]);

    async function getAccounts() {
        const response=await axiosFetchs.fetchAccounts();
        setAccounts([...response]);
    }

    async function getBlockChainAccounts() {
        const response=await axiosFetchs.listBlockChainAccounts();
        setBlockChainAccounts([...response]);
    }

    async function showUpdateAccountModal () {
        console.log(blockChainAccounts);
    }

    async function showCreateAccountModal () {
        Modal.getOrCreateInstance("#createAccountModal").show();
    }

    async function showCreateBlockChainAccountModal () {
        Modal.getOrCreateInstance("#createBlockchainAccountModal").show();
    }

    const accountsMap=accounts?.map(x=>{
        return <AccountCardList account={x}/>
    })

    const blockchainAccountsMap=blockChainAccounts?.map(x=>{
        return <BlockchainAccountCardList blockchainAccount={x}/>
    })

    if (!accounts||!blockChainAccounts) return (
        <div>
            LOADING...
        </div>
    )
    return (
        <div>
            <h2>Cuentas</h2>
            <h2>Cuentas Normales</h2>
            {accounts.length>0 ? accountsMap : "No tienes cuentas Normales, crea Una"}
            <button className="btn btn-primary" onClick={showCreateAccountModal}>Crear Cuenta Normal</button>
            <h2>Cuentas BlockChain</h2>
            {blockChainAccounts.length>0 ? blockchainAccountsMap : "No tienes cuentas de Blockchain, añade una"}
            <button className="btn btn-primary" onClick={showCreateBlockChainAccountModal}>Crear Cuenta BlockChain</button>
            <button onClick={showUpdateAccountModal}>Test</button>
            <CreateAccountModal onSubmit={()=>{getAccounts()}}/>
            <CreateBlockchainAccountModal onSubmit={()=>{getBlockChainAccounts()}} />

            <ToastContainer containerId="axios" />
        </div>
    )
}