"use server"
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
import ManualStaticComponent from "@/components/static/manual/manual";
import { Users } from "@/components/classes/entity/users.entity";
import { cookies } from "next/headers";

export default async function ManualPage () {
    const cookie=await cookies();
        const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;
    return (
        <div>
            <HeaderComponent user={user}/>
            <FrontStaticComponent title="Manual" subtitle="Todo lo que debes saber para usar Banker" />
            <ManualStaticComponent />
            <FooterComponent />
        </div>
    );
}