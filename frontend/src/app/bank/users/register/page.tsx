
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import NavBar from "@/components/navbar/navbar";
import Register from "@/components/bank/users/register/register";
import UserRegister from "@/components/bank/users/register/register";

export default function RegisterPage () {
    return (
        <div>
            <NavBar />
            <FrontStaticComponent title="Register" subtitle="Hazte Cliente" />
            <Register />
            <FooterComponent />
        </div>
    )
}