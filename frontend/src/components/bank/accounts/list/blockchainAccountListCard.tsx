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

    })

    async function getBalances () {
        const blockchainEther=await Web3Service.getBalanceEther(blockchainAccount.address as string);
        const blockchainBC=await buildingsContract.getBalanceBS(blockchainAccount.address as string);
        
        setEther(blockchainEther);
        setBC(blockchainBC);
    }
    

    async function goToBlockChainAccountView () {
        await axiosFetchs.setBlockchainAccountIdCookie(blockchainAccount.id as number);
        window.location.href=`/bank/blockchainAccounts/view`;
    }
    return (
        <div onClick={goToBlockChainAccountView} className="m-auto mt-3 border border-2 border-black px-5 py-2 shadow shadow-5" style={{maxWidth: 500, backgroundColor: "whitesmoke" }}>
            <div className="row justify-content-between overflow-hidden">
                <div className="col-6">
                    <h6 className="text-primary fs-5">Cuenta BlockChain Banker</h6>
                    <h6 className="fs-5">{blockchainAccount.address}</h6>
                </div>
                <div className="col-5">
                    <div className="text-end mt-2">
                        <h5 className="text-warning fw-bolder">{ether} Eth</h5>
                        <h5 className="text-warning fw-bolder">{BC} BC</h5>
                    </div>
                </div>
            </div>
            <div className="text-center">
            </div>
        </div>
    );
} 