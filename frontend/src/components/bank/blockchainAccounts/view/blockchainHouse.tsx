"use client"

import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { useEffect, useRef, useState } from "react";
import { Transaction } from "web3";

class Props {
    building: BCBuilding = {}
    color: string = "green";
    blockchainAccount: BlockchainAccounts={};
    onClickMethod= (transaction:Transaction) => {}
}

export default function House(props:Props) {
    const [coinWin, setCoinWin] = useState(0 as number);
    const [valorVenta, setValorVenta] = useState(0 as number);
    const [intervalUpdateCoinWin, setIntervalUpdateCoinWin]= useState(null as number|null);
    const doOnce=useRef(false);

    const fee = 10;
    const building=props.building;
    const blockchainAccount=props.blockchainAccount;

    useEffect(() => {
        updateCoinWin();
        if (!doOnce.current && !intervalUpdateCoinWin) {
            doOnce.current=true;
            const intval=setInterval(updateCoinWin, 1000) as any;
            setIntervalUpdateCoinWin(intval);
        } else {
            if (intervalUpdateCoinWin) {
                clearInterval(intervalUpdateCoinWin);
                const intval=setInterval(updateCoinWin, 1000) as any;
                setIntervalUpdateCoinWin(intval);
            }
        }
        
        
    }, [building]);

    function updateCoinWin() {
        const dateNow = new Date();
        const secondsNow = dateNow.getTime() / 1000 as number;
        const level = parseInt(building.level?.toString() as string);

        const time = secondsNow - parseInt(building.timeFromSpend?.toString() as string);
        setCoinWin((time * fee * level)/100);
    }

    async function payloadBuilding () {
        const transaction=await buildingsContract.payloadBuilding(blockchainAccount.address as string,parseInt(building.tokenId?.toString() as string));
        props.onClickMethod(transaction);
    }

    async function upLevelBuilding () {
        const transaction=await buildingsContract.upLevelBuilding(blockchainAccount.address as string,parseInt(building.tokenId?.toString() as string));
        props.onClickMethod(transaction);
    }

    async function putBuildingOnSale () {
        const transaction=await buildingsContract.putBuildingOnSale(blockchainAccount.address as string,parseInt(building.tokenId?.toString() as string),valorVenta);
        props.onClickMethod(transaction);
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
        <div className="col-md-6 col-xl-4">
            <div className={colorBorder}>
                {onSale()}
                <img className="img-fluid" src="/house1.jpg"></img>
                <h2>{building.name}</h2>
                <h4>Level: {building.level?.toString()}</h4>
                <h6>BDWin: {coinWin.toFixed(2)}</h6>
                {building.onSale ? <h6>Precio de Venta: {building.value?.toString()}</h6> : <></>}
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