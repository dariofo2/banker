"use server"
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
import BlockchainStaticComponent from "@/components/static/blockchain/blockchain";
import { cookies } from "next/headers";
import { Users } from "@/components/classes/entity/users.entity";

export default async function BlockChainPage () {
    const cookie=await cookies();
    const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;

    return (
        <div>
            <HeaderComponent user={user}/>
            <FrontStaticComponent title="BlockChain" subtitle="Descubre nuestra criptomoneda y la forma de minarla" />
            <BlockchainStaticComponent />
            <FooterComponent />
        </div>
    );
}