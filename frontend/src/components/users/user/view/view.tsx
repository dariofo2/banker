import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { useState } from "react";

export default function UserView () {
    const [user,setUser]=useState(new Users);

    return (
        <div>
            <h2>
                Nombre Usuario
            </h2>
            <h2> Email Usuario</h2>
            <button className="btn btn-primary">Editar Usuario</button>
            <button className="btn btn-outline-danger">Cambiar Contraseña</button>
        </div>
    )
}