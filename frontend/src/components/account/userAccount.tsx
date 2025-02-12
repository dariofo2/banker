"use client";
import { useEffect, useState } from "react";
import { Account, axiosFetchs, Movement } from "../axios";
import MovementCard from "../movement/movementCard";
import AccountCard from "./accountCard";

const axios = new axiosFetchs();

export default function UserAccount(props: any) {
    const [account, setAccount] = useState({} as Account);
    const [movements, setMovements] = useState([] as Movement[]);

    async function fetchAccount(accountId: number) {
        let responseAccount: Account = await axios.fetchAccount(accountId);
        setAccount(responseAccount);
    }

    async function fetchMovements(accountId: number) {
        let responseMovements: Movement[] = await axios.fetchMovements(accountId);
        setMovements(responseMovements);
        console.log(responseMovements)
    }

    useEffect(() => {
        
        fetchAccount(props.accountId);
        fetchMovements(props.accountId);
    });

    const movementsMap = movements.map((x) => {
        return (
            <div>
            <MovementCard
                key={x.id}
                id={x.id}
                originAccount={x.originAccount.user.name}
                destinationAccount={x.destinationAccount.user.name}
                money={x.money}>

            </MovementCard>
            </div>
        );
    });
    return (
        <div>
            <h1>User Account: </h1>
            <AccountCard id={account.id} name={account.name} type={account.type} balance={account.balance}></AccountCard>
            <h2>Movements: </h2>
            {movementsMap}
        </div>
    );
}
