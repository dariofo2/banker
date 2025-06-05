"use client"

import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { useEffect, useState } from "react";

class Props {
    building: BCBuilding = {}
    color: string = "green";

    onClickMethod= (contractMethod:any,value:number) => {}
}

export default function House(props:Props) {
    const [timeFromSpend,setTimeFromSpend]=useState(props.building.timeFromSpend)
    const [coinWin, setCoinWin] = useState(0 as number);
    const [valorVenta, setValorVenta] = useState(0 as number);
    
    
    const fee = 10;
    const building=props.building;

    useEffect(() => {
        updateCoinWin();
        setInterval(updateCoinWin, 1000);
    }, []);

    useEffect(()=>{
        setTimeFromSpend(props.building.timeFromSpend);
    },[props.building])

    function updateCoinWin() {
        const dateNow = new Date();
        const secondsNow = dateNow.getTime() / 1000 as number;
        
        const level = parseInt(building.level?.toString() as string);

        const time = secondsNow - parseInt(timeFromSpend?.toString() as string);
        setCoinWin(time * fee * level);
    }

    async function payloadBuilding () {
        const contractMethod=await buildingsContract.payloadBuilding(parseInt(building.tokenId?.toString() as string));
        props.onClickMethod(contractMethod,0);
    }

    async function upLevelBuilding () {
        const contractMethod=await buildingsContract.upLevelBuilding(parseInt(building.tokenId?.toString() as string));
        props.onClickMethod(contractMethod,1000000000000000000);
    }

    async function putBuildingOnSale () {
        const contractMethod=await buildingsContract.putBuildingOnSale(parseInt(building.tokenId?.toString() as string),valorVenta);
        props.onClickMethod(contractMethod,0);
    }

    function onSale() {
        if (building.onSale) return (
            <div className="position-absolute text-center pb-5 bottom-50 w-100">
                <span className="bg-black text-white h1 p-3 me-3">ON SALE</span>
            </div>
        )
    }

    const styleDivMain = "position-relative border border-1 rounded rounded-3 text-center bg-white p-3"
    const colorBorder = building.onSale ? `${styleDivMain} border-danger` : `${styleDivMain} border-primary`;
    return (
        <div className="">
            <div className={colorBorder}>
                {onSale()}
                <img className="img-fluid" src="/house1.jpg"></img>
                <h2>{building.name}</h2>
                <h4>Level: {building.level?.toString()}</h4>
                <h6>BDWin: {coinWin}</h6>
                <h6>Precio de Venta: {building.value?.toString()}</h6>
                <button className="btn btn-success" onClick={payloadBuilding}>PayLoad</button>
                <button className="btn btn-primary" onClick={upLevelBuilding}>Level UP</button>
                <button className="btn btn-warning" onClick={putBuildingOnSale}>Poner en Venta</button>
                <input className="form-control" id="valorVenta" type="number" onChange={(event) => {
                    setValorVenta(parseInt(event.target.value));
                }}></input>
            </div>
        </div>
    )

}