import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import HeaderComponent from "@/components/navbar/navbar";
import ManualStaticComponent from "@/components/static/manual/manual";

export default function ManualPage () {
    return (
        <div>
            <HeaderComponent />
            <FrontStaticComponent title="Manual" subtitle="Todo lo que debes saber para usar Banker" />
            <ManualStaticComponent />
            <FooterComponent />
        </div>
    );
}