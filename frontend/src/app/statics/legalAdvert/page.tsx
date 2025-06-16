"use server"
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
import LegalAdvertStaticComponent from "@/components/static/legalAdvert/legalAdvert";
import { Users } from "@/components/classes/entity/users.entity";
import { cookies } from "next/headers";

export default async function LegalAdvertPage () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;

    return (
        <div>
            <HeaderComponent user={user}/>
            <FrontStaticComponent title="Aviso Legal" subtitle="Lee nuestro Aviso Legal" />
            <LegalAdvertStaticComponent />
            <FooterComponent />
        </div>
    );
}