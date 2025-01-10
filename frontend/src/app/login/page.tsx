import { useState } from "react";

export default function LoginPage () {
    const [username,setusername] = useState();
    function sendLogin () {

    }
    return (
        <div>
        <h1>Login</h1>
        <form>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="text"></input>

        </form>
        </div>
    );
}