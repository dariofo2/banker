"use client"
import { useEffect, useState } from "react";
import { Account, axiosFetchs } from "../axios";

const axios=new axiosFetchs();

export default function UserAccount (props:any) {
    const [account,setAccount]=useState();

    async function fetchAccount (id:number) {
        let responseAccount:Account=await axios.fetchAccount(id) 
    }

    useEffect(()=>{
        fetchAccount(props.id);
    })
    return (
        <div>
            <h1>User Account: </h1>
        </div>
    )
}