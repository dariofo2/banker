"use client"
import { axiosFetchs,User } from "@/components/axios";
import { useState } from "react";
import Cookies from "js-cookie";


const axios=new axiosFetchs();

export default function LoginComponent () {
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [error,seterror]= useState("");
    const [success,setsuccess]=useState("");

    async function sendLogin (name:string,password:string) {
        let userloginfetch:Boolean=await axios.fetchLogin(name,password);

        //setUserCookies(userloginfetch);

        console.log(Cookies.get("access_token"));
        if (userloginfetch) {
            seterror("");
            setsuccess("Login Correcto!");
        } else {
            seterror("Error en Login. Usuario o Contraseña Incorrectos");
        }
        
       
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