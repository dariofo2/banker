import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
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