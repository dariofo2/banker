"user client"

import { useState } from "react";

export default function RegisterComponent() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function sendRegister(e: Event) {
        e.preventDefault();

    }
    return (
        <div>
            <form className="text-center" onSubmit={(e) => { }}>
                <h1>Register</h1>
                <label htmlFor="Nombre">Nombre</label>
                <br></br>
                <input
                    id="Nombre"
                    className="text-center"
                    type="text"
                    placeholder="Nombre"
                    title="Mínimo dos letras. No se permiten numeros ni caracteres Especiales"
                    pattern="^[A-Za-z]{2,}"
                    required
                    onChange={(e) => { setNombre(e.target.value) }}>
                </input>
                <br></br>
                <label htmlFor="Apellidos">Apellidos</label>
                <br></br>
                <input
                    id="Apellidos"
                    className="text-center"
                    type="text"
                    placeholder="Apellidos"
                    title="Mínimo dos letras. No se permiten Números ni Carácteres Especiales"
                    required
                    onChange={(e) => { setApellidos(e.target.value) }}>
                </input>
                <br></br>
                <label htmlFor="Email">Email</label>
                <br></br>
                <input
                    id="Email"
                    className="text-center"
                    type="email"
                    placeholder="Email"
                    title="Introduzca una Dirección de Email Real"
                    pattern="^+@+"
                    required
                    onChange={(e) => { setEmail(e.target.value) }}>
                </input>
                <br></br>
                <label htmlFor="Password">Password</label>
                <br></br>
                <input
                    id="Password"
                    className="text-center"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => { setPassword(e.target.value) }}>
                </input>
                <br></br>
                <input type="submit" value="Comenzar"></input>
            </form>
        </div>
    );
}