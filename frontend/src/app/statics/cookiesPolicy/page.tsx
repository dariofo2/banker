import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/front/frontStatic";
import HeaderComponent from "@/components/header/header";
import CookiesPolicyComponent from "@/components/static/cookiesPolicy/cookiesPolicy";
import LegalAdvertStaticComponent from "@/components/static/legalAdvert/legalAdvert";
import PrivacyPoliciyComponent from "@/components/static/privacyPolicy/privacyPolicy";

export default function CookiesPolicyPage () {
    return (
        <div>
            <HeaderComponent />
            <FrontStaticComponent title="Política de Cookies" subtitle="Consulta nuestra Política de Cookies" />
            <CookiesPolicyComponent />
            <FooterComponent />
        </div>
    );
}