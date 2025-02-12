"use client"
import Cookies from "js-cookie";
import { axiosFetchs } from "../axios";

const axios=new axiosFetchs();
export default function HeaderComponent (props:any) {
        /*
    //When second parameter is [] it runs only on Mount Creation of Component 1 time
    //If I want to use it on unmount Use Return, which is called in return is what execute on end of component
    //If i want to reload it on change of variables or props, add to second parameter [var1,var2]
        /*
    useEffect(()=>{
    },[])
    */ 
    async function logout () {
        await axios.logoutRemoveCookies();
        location.href="http://localhost:5000/main";
    }
    if (props.isLogged) {
        return (
            <div>
                {props.username}
                <button onClick={()=>{logout()}}>Logout</button>
            </div>
        );
    } else {
        return (
            <div>
                <a href="../auth/login">Login</a> | <a href="../auth/login">Register</a> | <a href="../auth/login">Menu</a>
            </div>
        )
    }
    
}