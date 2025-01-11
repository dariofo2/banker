import axios, { AxiosHeaders, AxiosResponseHeaders } from "axios";
import Cookies from "js-cookie";

export class RequestObject {
    headers:AxiosHeaders=new AxiosHeaders;

    constructor (jwtToken:string="") {
        this.headers.authorization=jwtToken;
        this.headers["Content-Type"]="application/json";
    }
    
}

export class Account {
    id:number=0;
    userid:number=0;
    name:string="";
    type:string="";
    balance: number=0;
}
export class UserLoginFetch {
    id:number;
    name:string;
    email:string;
    password?:string;
    access_token:string;

    constructor () {
        this.id=-1;
        this.name="";
        this.email="";
        this.access_token="";

    }
}
export class axiosFetchs {
    async fetchLogin (username:string,password:string) : Promise<UserLoginFetch>{
        let reqObject=new RequestObject();
        let response= await axios.post(
            "http://localhost:3000/login/login",
            {name:username,password:password},
            reqObject
        );
        let userLoginFetch:UserLoginFetch = await response.data;
        return userLoginFetch;
    }
    async fetchAccounts () : Promise<Account[]> {
        let reqObject=new RequestObject(Cookies.get("access_token"));
        let response= await axios.post(
            "http://localhost:3000/accounts/lists",
            {},
            reqObject
        );
        let accountsFetch:Account[]=response.data;
        console.log(accountsFetch);
        return accountsFetch;
    }
}
