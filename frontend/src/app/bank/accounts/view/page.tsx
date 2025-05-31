"use server"

import ListAccounts from "@/components/bank/accounts/list/listAccounts";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";

export default async function AccountsViewPage () {
    return (
        <div>
            <NavBar />
            <ListAccounts />
            <FooterComponent />
        </div>
    );
}