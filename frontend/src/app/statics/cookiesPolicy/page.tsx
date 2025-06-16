"use server"
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
import CookiesPolicyComponent from "@/components/static/cookiesPolicy/cookiesPolicy";
import LegalAdvertStaticComponent from "@/components/static/legalAdvert/legalAdvert";
import PrivacyPoliciyComponent from "@/components/static/privacyPolicy/privacyPolicy";
import { cookies } from "next/headers";
import { Users } from "@/components/classes/entity/users.entity";

export default async function CookiesPolicyPage () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;

    return (
        <div>
            <HeaderComponent user={user}/>
            <FrontStaticComponent title="Política de Cookies" subtitle="Consulta nuestra Política de Cookies" />
            <CookiesPolicyComponent />
            <FooterComponent />
        </div>
    );
}