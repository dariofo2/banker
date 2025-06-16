"use server"

import AccountsListAdmin from "@/components/admin/accounts/list/accountsListAdmin";
import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminAccountsListPage () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;
    
    if (!user) redirect("/");
    if (user.role!=2) redirect("/bank/accounts/list");

    return (
        <div>
            <NavBar user={user} />
            <AccountsListAdmin />
            <FooterComponent />
        </div>
    )
}