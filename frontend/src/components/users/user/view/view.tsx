"use client"
import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { useContext, useState } from "react";
import UserUpdateModal from "./updateUserModal";
import UserUpdatePasswordModal from "./updatePasswordModal";
import UpdateUserProvider, { UpdateUserContext } from "./userContext";

export default function UserView () {
    const updateUserContext=useContext(UpdateUserContext);
    console.log(updateUserContext);
    return (
        <div style={{margin:80}}>
            
            <h2>
                {updateUserContext.user.hola}
                Nombre Usuario
            </h2>
            <h2> Email Usuario</h2>
            <button className="btn btn-primary" onClick={()=>{updateUserContext.updateUser()}}>Editar Usuario</button>
            <button className="btn btn-outline-danger">Cambiar Contraseña</button>
            <UserUpdateModal />
            <UserUpdatePasswordModal />
            
        </div>
    )
}