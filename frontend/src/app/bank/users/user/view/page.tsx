"use server"
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import UserViewMain from "@/components/users/user/view/userViewMain";

export default async function UserViewPage() {
    return (
        <div>
            <NavBar />
            <UserViewMain />
            <FooterComponent />
        </div>
    );
}