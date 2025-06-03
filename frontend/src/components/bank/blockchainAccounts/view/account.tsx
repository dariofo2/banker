"use client"

import { useEffect, useState } from "react";
import House from "./house";
import { BCBuilding } from "@/components/classes/objects/BCBuilding";

class Props {
    address?:string;
    ethereumBalance?:string;
    buildings?:BCBuilding[];
    buildingsOnSale?:BCBuilding[];
    symbol?:string;
    coinBalance?:string;
}

export default function Account(props: any) {
    function getAddress() {
        if (props.address) return <h6>Address: {props.address}</h6>
    }
    function getEthereumBalance() {
        if (props.ethereumBalance) return <h3><strong className="text-warning">Ethereum</strong> {props.ethereumBalance}</h3>
    }
    function getBuildings() {
        if (props.buildings!="") return (
            <div>
            <h2>My Buildings:</h2>
            <div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {props.buildings}
            </div>
            </div>
        )
    }
    function getOnSaleBuildings() {
        if (props.buildingsOnSale!="") return (
            <div>
            <h2>On Sale Buildings:</h2>
            <div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {props.buildingsOnSale}
            </div>
            </div>
        )
    }
    return (
        <div className="container p-3">
            <div className="p-3">
            {getAddress()}
            {getEthereumBalance()}
            <h2><strong className="text-warning">{props.symbol}</strong> {props.coinBalance}</h2>
            <br></br>
            <input className="form-control w-25 d-inline" id="nombreEdificio" type="text" placeholder="nombre Edificio"></input>
            <button className="btn btn-outline-primary" onClick={async () => {
                const element = document.getElementById('nombreEdificio') as HTMLInputElement;
                if (element.value != "") {
                    await props.buildsContract.createBuilding(element.value);
                    location.reload();
                }

            }}>Crear Edificio</button>
            </div>
            
            {getBuildings()}
            {getOnSaleBuildings()}
        </div>
    );
}