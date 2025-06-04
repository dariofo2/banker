"use client"

import { useEffect, useState } from "react";
import House from "./blockchainHouse";
import { BCBuilding } from "@/components/classes/objects/BCBuilding";
import { BlockchainAccountData } from "@/components/classes/objects/BlockchainAccountData";
import { buildingsContract } from "@/components/web3.js/contractBuildings";

class Props {
    blockchainAccountData?: BlockchainAccountData
    buildings?: [];
    buildingsOnSale?: [];
    onCreateBuilding= (createBuilding:any,value:any)=>{};
}

export default function blockchainAccountCardView(props: Props) {
    const blockchainAccountData=props.blockchainAccountData;

    function getAddress() {
        if (blockchainAccountData?.address) return <h6>Address: {blockchainAccountData?.address}</h6>
    }
    function getEthereumBalance() {
        if (blockchainAccountData?.etherBalance) return <h3><strong className="text-warning">Ethereum</strong> {blockchainAccountData?.etherBalance}</h3>
    }
    function getBuildings() {
        if (props?.buildings) return (
            <div>
            <h2>My Buildings:</h2>
            <div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {props?.buildings}
            </div>
            </div>
        )
    }
    function getOnSaleBuildings() {
        if (props?.buildingsOnSale) return (
            <div>
            <h2>On Sale Buildings:</h2>
            <div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {props?.buildingsOnSale}
            </div>
            </div>
        )
    }
    return (
        <div className="container p-3" style={{marginTop:80}}>
            <div className="p-3">
            {getAddress()}
            {getEthereumBalance()}
            <h2><strong className="text-warning">{blockchainAccountData?.symbolCoin}</strong> {blockchainAccountData?.coinBalance}</h2>
            <br></br>
            <input className="form-control w-25 d-inline" id="nombreEdificio" type="text" placeholder="nombre Edificio"></input>
            <button className="btn btn-outline-primary" onClick={async () => {
                const element = document.getElementById('nombreEdificio') as HTMLInputElement;
                if (element.value != "") {
                    const createBuilding=await buildingsContract.createBuilding(element.value);
                    const value=1000000000000000000;
                    props.onCreateBuilding(createBuilding,value);
                    //location.reload();
                }

            }}>Crear Edificio</button>
            </div>
            
            {getBuildings()}
            {getOnSaleBuildings()}
        </div>
    );
}