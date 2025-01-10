import axios from "axios";

export class RequestObject {
    headers = {
        "Content-Type":"application/json",
        "authorization":"",
    }

    constructor (jwtToken:string="") {
        this.headers.authorization=jwtToken;
    }
    
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
    async fetchLogin (username:string|undefined,password:string|undefined) : Promise<UserLoginFetch>{
        let reqObject=new RequestObject();
        let response= await axios.post(
            "http://localhost:3000/login/login",
            {name:username,password:password},
            reqObject
        );
        let userLoginFetch:UserLoginFetch = await response.data
        return userLoginFetch;
    }
}
