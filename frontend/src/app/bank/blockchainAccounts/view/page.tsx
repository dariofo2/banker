"use server"
import ViewBlockChainAccount from "@/components/bank/blockchainAccounts/view/viewBlockchainAccount";
import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import SocketIOClient from "@/components/socket.io/socket.io";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function BlockChainAccountsViewPage () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;
    
    if (!user) redirect("/");
    if (user.role!=0 && user.role!= 1) redirect("/bank/users/view");

    return (
        <div>
        <NavBar user={user}/>
        <ViewBlockChainAccount />
        <FooterComponent />
        <SocketIOClient />
        </div>
    )
}