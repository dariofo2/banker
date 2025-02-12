import axios, { Axios, AxiosError, AxiosHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";
import Cookies from "js-cookie";

export class RequestObject {
    headers: AxiosHeaders = new AxiosHeaders;

    constructor(jwtToken: string = "") {
        this.headers.authorization = jwtToken;
        this.headers["Content-Type"] = "application/json";
    }

}

export class Account {
    id: number;
    user: User;
    name: string;
    type: string;
    originMovements: Movement[];
    destinationMovements: Movement[];
    balance: number;

    constructor(id:number,user:User,name:string,type:string,originMovements:Movement[],destinationMovements:Movement[],balance:number) {
        this.id = id;
        this.user = user
        this.name = name;
        this.type = type;
        this.originMovements=originMovements;
        this.destinationMovements=destinationMovements;
        this.balance = balance;
    }
}

export class Movement {
    id: number;
    originAccount: Account;
    destinationAccount: Account;
    money: number;

    constructor(id:number,originAccount:Account,destinationAccount:Account,money:number) {
        this.id = id;
        this.originAccount = originAccount;
        this.destinationAccount = destinationAccount;
        this.money = money;
    }
}
export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    access_token?:string;

    constructor(id:number,name:string,email:string,password:string,access_token:string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.access_token= access_token;
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
            await this.SetcookiesAtLogin(userLoginFetch);
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

    async reloadJWTTokenAfter401Error(error: AxiosError): Promise<any> {
        if (error.status == 401) {
            let login = await this.fetchLogin(<string>Cookies.get("name"), <string>Cookies.get("password"));
            if (login) {
                window.location.reload();
            } else {
                window.location.replace("http://localhost:5000/login");
            }
        }
    }



    async createUser(name: string, password:string, email:string): Promise<boolean> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        axios.post(
            "http://localhost:3000/user/create",
            {
                name: name,
                password: password,
                email: email,
            },
            reqObject
        )
        return true;
    }

    async removeUser(id: number): Promise<boolean> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            await axios.post(
                "http://localhost:3000/user/delete",
                { id: id },
                reqObject
            )
            return true;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return false;
        }
        
    }

    async updateUser(name:string,email:string,password:string) {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            await axios.post(
                "http://localhost:3000/user/update",
                {
                    name:name,
                    email:email,
                    password:password
                },
                reqObject
            )
            return true;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return false;
        }
        
    }

    async createAccount(name:string,type:string): Promise<boolean> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            await axios.post(
                "http://localhost:3000/account/create",
                {
                    name:name,
                    type:type,
                },
                reqObject
            )
            return true;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return false;
        }
    }

    async removeAccount(id:number): Promise<boolean> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            await axios.post(
                "http://localhost:3000/account/delete",
                {
                    id:id
                },
                reqObject
            )
            return true;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return false;
        }
    }

    async createMovement(origin_account_id:number,destination_account_id:number,money:number): Promise<boolean> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            await axios.post(
                "http://localhost:3000/movement/create",
                {
                    origin_account_id:origin_account_id,
                    destination_account_id:destination_account_id,
                    money:money
                },
                reqObject
            )
            return true;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return false;
        }
        return true;
    }

    async removeMovement(id: number): Promise<boolean> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            let response = await axios.post(
                "http://localhost:3000/movement/delete",
                { id: id },
                reqObject
            )
            return true;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return false;
        }

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

    async setAccountIdCookie (accountId:number) {
        Cookies.set("accountId",accountId.toString());
    }
    
    async fetchAccount(accountId: number): Promise<Account> {
        try {
            let reqObject = new RequestObject(Cookies.get("access_token"));
            let response = await axios.post(
                "http://localhost:3000/accounts/list",
                { id: accountId },
                reqObject
            );
            return <Account>response.data;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return {} as Account;
        }
    }

    async fetchMovements(accountId:number): Promise<Movement[]> {
        try {
            let reqObject = new RequestObject(Cookies.get("access_token"));
            let response = await axios.post(
                "http://localhost:3000/movements/list",
                { origin_account_id: accountId },
                reqObject
            );
            return <Movement[]>response.data;
        } catch (error) {
            this.reloadJWTTokenAfter401Error(<AxiosError>error);
            return [];
        }
    }
}
