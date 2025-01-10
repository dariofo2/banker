import axios from "axios";

class RequestObject {
    headers = {
        "content-type":"application/json",
        "authorization":"",
    }
    
    constructor (jwtToken:string="") {
        this.headers.authorization=jwtToken;
    }
    
}

async function fetchLogin (username:string,password:string) : Promise<any>{
    let reqObject=new RequestObject();
    let response= await axios.post(
        "http://localhost:3000",
        {name:username,password:password},
        reqObject
        );
}