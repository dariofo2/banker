"use server"
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import NavBar from "@/components/navbar/navbar";
import Register from "@/components/bank/users/register/register";
import UserRegister from "@/components/bank/users/register/register";
import { cookies } from "next/headers";
import { Users } from "@/components/classes/entity/users.entity";
import { redirect } from "next/navigation";

export default async function RegisterPage () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;

    if (user) redirect("/bank/users/view");
    
    return (
        <div>
            <NavBar user={user}/>
            <FrontStaticComponent title="Register" subtitle="Hazte Cliente" />
            <Register />
            <FooterComponent />
        </div>
    )
}