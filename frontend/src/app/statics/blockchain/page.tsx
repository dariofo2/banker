import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/front/frontStatic";
import HeaderComponent from "@/components/header/header";
import BlockchainStaticComponent from "@/components/static/blockchain/blockchain";

export default function BlockChainPage () {
    return (
        <div>
            <HeaderComponent />
            <FrontStaticComponent title="BlockChain" subtitle="Descubre nuestra criptomoneda y la forma de minarla" />
            <BlockchainStaticComponent />
            <FooterComponent />
        </div>
    );
}