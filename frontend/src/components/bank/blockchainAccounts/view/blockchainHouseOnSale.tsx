"use client"

import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { Transaction } from "web3";

class Props {
    building?:BCBuilding;
    blockchainAccount: BlockchainAccounts = {};
    onBuyClick= (transaction:Transaction)=>{};
}
export default function HouseOnSale(props:Props) {
    const building=props.building;
    const blockchainAccount= props.blockchainAccount;

    async function transferBuyBuilding () {
        const transaction=await buildingsContract.transferBuyBuilding(blockchainAccount.address as string,parseInt(building?.tokenId?.toString() as string));
        props.onBuyClick(transaction);
    }

    function onSale () {
        if (building?.onSale) return (
            <div className="position-absolute text-center pb-5 bottom-50 w-100">
                <span className="bg-black text-white h1 p-3">ON SALE</span>
            </div>
        )
    }

    return (
        <div className="col-md-6 col-xl-4">
            <div className="text-center position-relative bg-white border border-1 rounded rounded-3 border-danger p-3">
            {onSale()}
            <img className="img-fluid" src="/house1.jpg"></img>
            <h2>{building?.name}</h2>
            <h4>Level: {building?.level?.toString()}</h4>
            <h6>Precio de Venta: {((parseInt((building?.value as bigint).toString()))/100).toFixed(2)}</h6>
            <button className="btn btn-primary" onClick={transferBuyBuilding}>Comprar Casa</button>
            </div>
        </div>
    )

}