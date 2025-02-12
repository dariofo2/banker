
import HeaderComponent from "@/components/header/headerComponent";

//Not needed Cookies from client, We want Server Cookies sent by Request from the User To sever
//import Cookies from "js-cookie";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
//Server Side Cookies
import { cookies } from "next/headers";

export default function MainPage() {
    let cookieStore: ReadonlyRequestCookies;

    //GETS THE COOKIE FROM SERVER (IT's Always sent by Client on HTTP Request,
    //On the page which were Set, in this case this Next.js Server by default)

    async function getCookieName() {
        cookieStore = await cookies();
        const name = cookieStore.get("name");
        console.log(name);
        return name;
    }

    async function conditionalRenderIfLogged() {
        let name = await getCookieName();
        let isLogged:boolean;
        
        if (name) {
            return <HeaderComponent isLogged={true} username={name.value}></HeaderComponent>
        } else {
            return <HeaderComponent isLogged={false}></HeaderComponent>
        }
    }

    return (
        <div>
            {conditionalRenderIfLogged()}
        </div>
    );
}