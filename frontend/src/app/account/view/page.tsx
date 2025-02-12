
import UserAccount from "@/components/account/userAccount";
import UserAccounts from "@/components/account/userAccounts";
import Footer from "@/components/footer/footer";
import HeaderComponent from "@/components/header/header";
import { RequestCookie, RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

//Not needed Cookies from client, We want Server Cookies sent by Request from the User To sever
//import Cookies from "js-cookie";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
//Server Side Cookies
import { cookies } from "next/headers";

export default function MainPage() {
    let cookieStore: ReadonlyRequestCookies;
    let name: RequestCookie;
    let accountId:RequestCookie;
    //GETS THE COOKIE FROM SERVER (IT's Always sent by Client on HTTP Request,
    //On the page which were Set, in this case this Next.js Server by default)

    async function getCookieName() {
        cookieStore = await cookies();
        const name = cookieStore.get("name");
        console.log(name);
        return name;
    }

    async function getCookieAccountId() {
        cookieStore = await cookies();
        const accountId=await cookieStore.get("accountId");
        console.log(accountId);
        return accountId as RequestCookie;
    }
    async function conditionalRenderIfLogged() {
        let name = await getCookieName();
        let accountId=await getCookieAccountId();
        if (name) {
            return (
                <div>
                <HeaderComponent isLogged={true} username={name.value}></HeaderComponent>
                <UserAccount accountId={accountId.value}></UserAccount>
                </div>
            )
        } else {
            return <HeaderComponent isLogged={false}></HeaderComponent>
        }
    }

    return (
        <div>
            {conditionalRenderIfLogged()}
            <Footer></Footer>
        </div>
    );
}