"use client"
/*
import { useEffect, useState } from "react";
import { Account, axiosFetchs } from "../axios";
import AccountCard from "./accountCard";

const axios=new axiosFetchs();
export default function UserAccounts () {
    const [accounts,setAccounts]=useState([] as Account[]);

    async function getUserAccounts () {
        let responseAccounts=await axios.fetchAccounts();
        setAccounts(responseAccounts);
    } 

    const accountsMap:any=accounts.map(x=>{
        return <AccountCard key={x.id} id={x.id} name={x.name} type={x.type} balance={x.balance}></AccountCard>;
    })

    useEffect(()=>{
        getUserAccounts();    
    },[]);
    return (
        <div>
            <h1>User Accounts:</h1>
            {accountsMap}
        </div>
    );
}
    */