"use client"

import { useEffect, useState } from "react";

export default function House(props) {
    const [coinWin, setCoinWin] = useState(0 as number);
    const [valorVenta, setValorVenta] = useState(0 as number);
    const fee = 10;

    useEffect(() => {
        updateCoinWin();
        setInterval(updateCoinWin, 1000);
    }, []);

    function updateCoinWin() {
        const dateNow = new Date();
        const secondsNow = dateNow.getTime() / 1000 as number;

        const level = parseInt(props.level);
        const timeFromSpend = parseInt(props.timeFromSpend);

        const time = secondsNow - timeFromSpend;
        setCoinWin(time * fee * level);
    }

    function onSale() {
        if (props.onSale) return (
            <div className="position-absolute text-center pb-5 bottom-50 w-100">
                <span className="bg-black text-white h1 p-3 me-3">ON SALE</span>
            </div>
        )
    }

    const styleDivMain = "position-relative border border-1 rounded rounded-3 text-center bg-white p-3"
    const colorBorder = props.onSale ? `${styleDivMain} border-danger` : `${styleDivMain} border-primary`;
    return (
        <div className="">
            <div className={colorBorder}>
                {onSale()}
                <img className="img-fluid" src="/house1.jpg"></img>
                <h2>{props.name}</h2>
                <h4>Level: {props.level}</h4>
                <h6>BDWin: {coinWin}</h6>
                <h6>Precio de Venta: {props.value}</h6>
                <button className="btn btn-success" onClick={() => {
                    props.buildsContract.payloadBuilding(props.tokenId);
                    location.reload();
                }}>PayLoad</button>
                <button className="btn btn-primary" onClick={() => {
                    props.buildsContract.upLevelBuilding(props.tokenId);
                    location.reload();
                }}>Level UP</button>
                <button className="btn btn-warning" onClick={() => {
                    props.buildsContract.putBuildingOnSale(props.tokenId, valorVenta);
                    location.reload();
                }}>Poner en Venta</button>
                <input className="form-control" id="valorVenta" type="number" onChange={(event) => {
                    setValorVenta(parseInt(event.target.value));
                }}></input>
            </div>
        </div>
    )

}