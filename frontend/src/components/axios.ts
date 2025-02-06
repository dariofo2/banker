import axios, { AxiosError, AxiosHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";
import Cookies from "js-cookie";

export class RequestObject {
    headers: AxiosHeaders = new AxiosHeaders;

    constructor(jwtToken: string = "") {
        this.headers.authorization = jwtToken;
        this.headers["Content-Type"] = "application/json";
    }

}

export class Account {
    id: number = 0;
    userid: number = 0;
    name: string = "";
    type: string = "";
    balance: number = 0;

    constructor () {
        this.id=-1;
        this.userid=-1
        this.name="";
        this.type="";
        this.balance=0;
    }
}

export class Movement {
    id: number;
    origin_account_id: number;
    destination_account_id: number;
    money: number;

    constructor() {
        this.id = -1;
        this.origin_account_id = -1;
        this.destination_account_id = -1;
        this.money = 0;
    }
}
export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    access_token: string;

    constructor() {
        this.id = -1;
        this.name = "";
        this.email = "";
        this.password = "";
        this.access_token = "";

    }
}


export class axiosFetchs {
    /**
     * Fetch a Login to Backend and set Cookies + JWT Token
     * @param username 
     * @param password 
     * @returns Promise<Boolean>
     */
    async fetchLogin(username: string, password: string): Promise<Boolean> {
        try {
            let reqObject = new RequestObject();
            let userLoginFetch: User;
            let response = await axios.post(
                "http://localhost:3000/login/login",
                { name: username, password: password },
                reqObject
            );
            userLoginFetch = <User>await response.data;
            this.SetcookiesAtLogin(userLoginFetch);
            return true;
        } catch {
            this.logoutRemoveCookies();
            return false;
        }
    }

    async SetcookiesAtLogin(user: User) {
        Cookies.set("id", user.id.toString());
        Cookies.set("name", user.name);
        Cookies.set("email", user.email);
        Cookies.set("password", user.password);
        Cookies.set("access_token", "Bearer " + user.access_token);
    }

    async logoutRemoveCookies() {
        Cookies.remove("id");
        Cookies.remove("name");
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("access_token");
    }

    async reloadJWTTokenAfter401Error (error:AxiosError):Promise<any> {
        if (error.status == 401) {
            let login=await this.fetchLogin(<string>Cookies.get("name"),<string>Cookies.get("password"));
            if (login) {
                window.location.reload();
            } else {
                window.location.replace("http://localhost:5000/login");
            }
        }
    }



    async createUser(): Promise<boolean>{
        return true;
    }

    async removeUser(): Promise<boolean>{
        return true;
    }

    async updateUser() {

    }

    async createAccount(): Promise<boolean>{
        return true;
    }

    async removeAccount(): Promise<boolean>{
        return true;
    }

    async createMovement(): Promise<boolean>{
        return true;
    }

    async removeMovement(): Promise<boolean>{
        return true;
    }
    async fetchAccounts(): Promise<Account[]> {
        try {
            let reqObject = new RequestObject(Cookies.get("access_token"));
            let response = await axios.post(
                "http://localhost:3000/accounts/lists",
                {},
                reqObject
            );
            let accountsFetch: Account[] = response.data;
            console.log(accountsFetch);
            return accountsFetch;

        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return [];
        }
    }

    async fetchAccount(id:number): Promise<Account> {
        try {
            let reqObject = new RequestObject(Cookies.get("access_token"));
            let response = await axios.post(
                "http://localhost:3000/accounts/list",
                {id:id},
                reqObject
            );
            return <Account>response.data;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return new Account();
        }
    }

    async fetchMovements (): Promise<Movement[]> {
        return [];
    }
}
