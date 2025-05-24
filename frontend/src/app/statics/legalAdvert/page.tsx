import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/front/frontStatic";
import HeaderComponent from "@/components/header/header";
import LegalAdvertStaticComponent from "@/components/static/legalAdvert/legalAdvert";

export default function LegalAdvertPage () {
    return (
        <div>
            <HeaderComponent />
            <FrontStaticComponent title="Aviso Legal" subtitle="Lee nuestro Aviso Legal" />
            <LegalAdvertStaticComponent />
            <FooterComponent />
        </div>
    );
}