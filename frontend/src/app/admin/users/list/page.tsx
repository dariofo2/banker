"use server"

import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminUsersList () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;
    
    if (!user) redirect("/");
    if (user.role!=2) redirect("/bank/users/view");

    return (
        <div>
            <NavBar user={user} />

            <FooterComponent />
        </div>
    )
}