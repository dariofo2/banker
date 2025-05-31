"use server"
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import UserView from "@/components/users/user/view/userView";
import { cookies } from "next/headers";

export default async function UserViewPage() {
    const cookie=await cookies()
    const user=JSON.parse(cookie.get("user")?.value as string);
    
    return (
        <div>
            <NavBar />
            <UserView />
            <FooterComponent />
        </div>
    );
}