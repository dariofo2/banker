import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { Web3Service } from "@/components/web3.js/web3";
import { useEffect, useState } from "react";
class Props {
    blockchainAccount?:BlockchainAccounts
}

export default function BlockchainAccountCardList (props:Props) {
    const blockchainAccount=props.blockchainAccount as BlockchainAccounts;

    const [ether,setEther]=useState(null as string|null);
    const [BC,setBC]=useState(null as string|null)

    useEffect(()=>{
        getBalances();
    })

    async function getBalances () {
        const blockchainEther=await Web3Service.getBalanceEther(blockchainAccount.address as string);
        const etherFormatted=parseFloat(blockchainEther).toFixed(2);
        const blockchainBC=await buildingsContract.getBalanceBS(blockchainAccount.address as string);
        const BCFormatted=(parseInt(blockchainBC)/100).toFixed(2);
        
        setEther(etherFormatted);
        setBC(BCFormatted);
    }
    

    async function goToBlockChainAccountView () {
        await axiosFetchs.setBlockchainAccountIdCookie(blockchainAccount.id as number);
        window.location.href=`/bank/blockchainAccounts/view`;
    }
    return (
        <div onClick={goToBlockChainAccountView} className="m-auto mt-3 bg-black px-5 py-4" style={{maxWidth: 700, backgroundColor: "whitesmoke", border:"2px solid blueviolet", boxShadow:"0 6px 15px 0 blueviolet", cursor:"pointer" }}>
            <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between overflow-hidden">
                <div className="overflow-hidden">
                    <h6 className="fs-5 fw-bold text-pink-dark-lighter">Cuenta BlockChain Banker</h6>
                    <h6 className="fs-6 text-white">{blockchainAccount.address}</h6>
                </div>
                <div className="">
                    <div className="text-end mt-2" style={{whiteSpace:"nowrap"}}>
                        <h6 className="text-warning fw-bolder fs-5">{ether} <span className="text-white">Eth</span></h6>
                        <h6 className="fw-bolder fs-5" style={{color:"yellow"}}>{BC} <span className="text-white">BC</span></h6>
                    </div>
                </div>
            </div>
            <div className="text-center">
            </div>
        </div>
    );
} 