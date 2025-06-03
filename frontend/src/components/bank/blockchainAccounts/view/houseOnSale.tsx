"use client"

import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import { buildingsContract } from "@/components/web3.js/contractBuildings";

class Props {
    building?:BCBuilding;
}
export default function HouseOnSale(props:Props) {
    const building=props.building;

    function onSale () {
        if (building?.onSale) return (
            <div className="position-absolute text-center pb-5 bottom-50 w-100">
                <span className="bg-black text-white h1 p-3">ON SALE</span>
            </div>
        )
    }

    return (
        <div>
            <div className="text-center position-relative bg-white border border-1 rounded rounded-3 border-danger p-3">
            {onSale()}
            <img className="img-fluid" src="/house1.jpg"></img>
            <h2>{building?.name}</h2>
            <h4>Level: {building?.level}</h4>
            <h6>Precio de Venta: {building?.value}</h6>
            <button className="btn btn-primary" onClick={() => {
                buildingsContract.transferBuyBuilding(building?.tokenId as number);
                location.reload();
            }}>Comprar Casa</button>
            </div>
        </div>
    )

}