"use client"

import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import { buildingsContract } from "@/components/web3.js/contractBuildings";

class Props {
    building?:BCBuilding;
    onBuyClick= (contractMethod:any,value:number)=>{};
}
export default function HouseOnSale(props:Props) {
    const building=props.building;

    async function transferBuyBuilding () {
        const contractMethod=await buildingsContract.transferBuyBuilding(parseInt(building?.tokenId?.toString() as string));
        props.onBuyClick(contractMethod,0);
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
            <h6>Precio de Venta: {building?.value?.toString()}</h6>
            <button className="btn btn-primary" onClick={transferBuyBuilding}>Comprar Casa</button>
            </div>
        </div>
    )

}