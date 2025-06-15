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
import Loading from "@/components/loading/loading";
import { Users } from "@/components/classes/entity/users.entity";
import FrontStaticComponent from "@/components/static/front/frontStatic";

export default function ListAccounts () {
    const [user,setUser]=useState(null as Users|null);
    const [accounts,setAccounts]=useState(null as Accounts[]|null);
    const [blockChainAccounts,setBlockChainAccounts] = useState(null as BlockchainAccounts[]|null);
    const [accountToUpdate,setAccountToUpdate]=useState(null as Accounts|null);

    useEffect(()=>{
        getUser();
        getAccounts();
        getBlockChainAccounts();
    },[]);

    async function getUser () {
        const response=await axiosFetchs.getUser();
        setUser({...response});
    }
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

    if (!accounts || !blockChainAccounts ||!user) return (
        <Loading />
    )

    const balanceTotal= accounts.reduce((total,x)=>{
        const balanceFloat=parseFloat((x.balance as number).toString());
        const balanceFloatPrecision=balanceFloat.toFixed(2);
        total+=parseFloat(balanceFloatPrecision);
        return total;
    },0);
    return (
        <div>
            <FrontStaticComponent 
                title={`Hola, ${user.name}`} 
                jsx={<div>
                        <h4>Tienes <span className="fw-bold">{balanceTotal} €</span></h4>
                        <h6 className="fs-6">Selecciona Tu Cuenta</h6>
                    </div>}
            />
            <h2 className="mt-5 text-center">Cuentas Normales</h2>
            {accounts.length>0 ? accountsMap : "No tienes cuentas Normales, crea Una"}
            <div className="text-center mt-3 mb-3">
                <button className="btn btn-warning" onClick={showCreateAccountModal}>Crear Cuenta Normal</button>
            </div>

            <div className="gradientePurpleBlack pt-1">
                <h2 className="text-white text-center mt-5">Cuentas BlockChain</h2>
                {blockChainAccounts.length>0 ? blockchainAccountsMap : "No tienes cuentas de Blockchain, añade una"}
                <div className="text-center mt-3 pb-3">
                    <button className="btn btn-warning" onClick={showCreateBlockChainAccountModal}>Crear Cuenta BlockChain</button>
                </div>
            </div>
            <CreateAccountModal onSubmit={()=>{getAccounts()}}/>
            <CreateBlockchainAccountModal onSubmit={()=>{getBlockChainAccounts()}} />

            <ToastContainer containerId="axios" />
        </div>
    )
}