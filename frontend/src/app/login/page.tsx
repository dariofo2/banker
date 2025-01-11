"use client"
import { axiosFetchs,UserLoginFetch } from "@/components/axios";
import { useState } from "react";
import Cookies from "js-cookie"

let axios=new axiosFetchs();

export default function LoginPage () {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [error,seterror]= useState("");
    const [success,setsuccess]=useState("");

    async function sendLogin (name:string,password:string) {
        try {
        let userloginfetch:UserLoginFetch=await axios.fetchLogin(name,password);

        setUserCookies(userloginfetch);

        console.log(Cookies.get("access_token"));
        setsuccess("Login Correcto!");
        
        return userloginfetch; 
        } catch {
            console.log("Error en Login");
            seterror("Error en Login. Usuario o Contraseña Incorrectos");
        } 
    }

    function setUserCookies (userloginfetch:UserLoginFetch) {
        Cookies.set("id",userloginfetch.id.toString());
        Cookies.set("name",userloginfetch.name);
        Cookies.set("email",userloginfetch.email);
        Cookies.set("access_token","Bearer " + userloginfetch.access_token);
    }


    return (
        <div className="loginMenu text-center">
        <h1>Login</h1>
        <form className="text-center" onSubmit={(e) =>{
            e.preventDefault();
            let name=document.querySelector('input[name="name"]') as HTMLInputElement;
            let password=document.querySelector("input[name='password']") as HTMLInputElement;
            sendLogin(name.value,password.value);
        }}>
            <label>Username</label>
            <br />
            <input type="text" name="name" required onChange={(e)=>{setusername(e.target.value)}}/>
            <br />
            <label>Password</label>
            <br />
            <input type="password" name="password" required onChange={(e)=>{setpassword(e.target.value)}} />
            <br />
            <input type="submit" value="Login"/>
            <h6>{error}</h6>
            <h5>{success}</h5>
        </form>
        </div>
    );
}