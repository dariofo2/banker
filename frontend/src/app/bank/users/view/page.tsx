"use server"
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import UserView from "@/components/bank/users/view/userView";
import { cookies } from "next/headers";
import { Users } from "@/components/classes/entity/users.entity";
import { redirect } from "next/navigation";

export default async function UserViewPage() {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;
    
    if (!user) redirect("/");
    
    return (
        <div>
            <NavBar user={user}/>
            <UserView />
            <FooterComponent />
        </div>
    );
}