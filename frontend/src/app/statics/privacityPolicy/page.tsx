import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
import LegalAdvertStaticComponent from "@/components/static/legalAdvert/legalAdvert";
import PrivacyPoliciyComponent from "@/components/static/privacyPolicy/privacyPolicy";

export default function PrivacityPolicyPage () {
    return (
        <div>
            <HeaderComponent />
            <FrontStaticComponent title="Política de Privacidad" subtitle="Consulta nuestra Política de Privacidad" />
            <PrivacyPoliciyComponent />
            <FooterComponent />
        </div>
    );
}