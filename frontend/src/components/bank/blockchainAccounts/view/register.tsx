"use client"
export default function Register () {
    return (
    <div>
        <h1>Login</h1>
        <input id="privateKey" type="text" placeholder="PrivateKey BlockChain"></input>
        <button onClick={()=>{
            const element = document.getElementById('privateKey') as HTMLInputElement;
            document.cookie="privateKey="+element.value;
            location.reload();
        }}>Entrar</button>
    </div>
    )
}