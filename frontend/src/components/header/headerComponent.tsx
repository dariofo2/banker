"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function HeaderComponent () {
    const [UserName,setUserName]=useState("");

    function getUserName() : string|undefined {
        return Cookies.get("name");
    }

    function returnHeader () {
        if (UserName!="") {
            return (
                <div>
                    {UserName}
                </div>
            );
        } else {
            return (
                <div>
                    Register Login Menu
                </div>
            );
        }
    }
    //When second parameter is [] it runs only on Mount Creation of Component 1 time
    //If I want to use it on unmount Use Return, which is called in return is what execute on end of component
    //If i want to reload it on change of variables or props, add to second parameter [var1,var2]
    useEffect(()=>{
        let username:string|undefined=getUserName();
        if (typeof username=="string") setUserName(username as string);
    },[]) 
    return (
        <div>
            {returnHeader()}
        </div>
    );
}