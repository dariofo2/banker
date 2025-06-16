"use server"
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
import LegalAdvertStaticComponent from "@/components/static/legalAdvert/legalAdvert";
import PrivacyPoliciyComponent from "@/components/static/privacyPolicy/privacyPolicy";
import { Users } from "@/components/classes/entity/users.entity";
import { cookies } from "next/headers";

export default async function PrivacityPolicyPage () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;

    return (
        <div>
            <HeaderComponent user={user}/>
            <FrontStaticComponent title="Política de Privacidad" subtitle="Consulta nuestra Política de Privacidad" />
            <PrivacyPoliciyComponent />
            <FooterComponent />
        </div>
    );
}