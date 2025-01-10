"use client"
import { axiosFetchs,UserLoginFetch } from "@/components/axios";
import { useState } from "react";
import Cookies from "js-cookie"

let axios=new axiosFetchs();
export default function LoginPage () {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");

    async function sendLogin (name:string|undefined,password:string|undefined) {
        let userloginfetch:UserLoginFetch=await axios.fetchLogin(name,password);
        console.log(userloginfetch.access_token);
        Cookies.set("id",userloginfetch.id.toString());
        Cookies.set("name",userloginfetch.name);
        Cookies.set("email",userloginfetch.email);
        Cookies.set("access_token","Bearer "+ userloginfetch.access_token);

        console.log(Cookies.get("access_token"));
        return userloginfetch;
        
    }
    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={(e) =>{
            e.preventDefault();
            let name=document.querySelector<HTMLInputElement>('input[name="name"]')?.value;
            let password=document.querySelector<HTMLInputElement>("input[name='password']")?.value;
            sendLogin(name,password);
        }}>
            <label>Username</label>
            <input type="text" name="name" required onChange={(e)=>{console.log(e)}}/>
            <label>Password</label>
            <input type="text" name="password" required />
            <input type="submit" value="submit"/>
        </form>
        </div>
    );
}