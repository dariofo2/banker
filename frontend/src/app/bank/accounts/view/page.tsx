"use server"

import ListAccounts from "@/components/bank/accounts/list/listAccounts";
import ViewAccount from "@/components/bank/accounts/view/viewAccount";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";

export default async function AccountsViewPage () {
    return (
        <div>
            <NavBar />
            <ViewAccount />
            <FooterComponent />
        </div>
    );
}