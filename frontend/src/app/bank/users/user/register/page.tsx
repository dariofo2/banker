
import FooterComponent from "@/components/footer/footer";
import FrontStaticComponent from "@/components/front/frontStatic";
import NavBar from "@/components/navbar/navbar";
import Register from "@/components/users/user/register/register";
import UserRegister from "@/components/users/user/register/register";

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