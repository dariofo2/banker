"use client"
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import UpdateUserProvider from "@/components/users/user/view/userContext";
import UserView from "@/components/users/user/view/view";

export default function UserViewPage() {
    return (
        <div>
            <NavBar />
            <UpdateUserProvider >
                <UserView />
            </UpdateUserProvider>
            <FooterComponent />
        </div>
    );
}