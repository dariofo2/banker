"use client"
import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { ChangeEvent, useContext, useState } from "react";
import UserUpdateModal from "./updateUserModal";
import UserUpdatePasswordModal from "./updatePasswordModal";
import { UpdateUserContext } from "./userViewContext";
import { Modal } from "bootstrap";

class Props {
    user?: Users;
}
export default function UserView (props:Props) {
    const user=props.user as Users;

    return (
        <div style={{margin:80}}>
            
            <h2>
                {}
                Nombre Usuario {props.user?.name}
            </h2>
            <h2> Email Usuario {props.user?.email}</h2>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateUserModal">Editar Usuario</button>
            <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#updateUserPasswordModal">Cambiar Contraseña</button>
            <UserUpdateModal user={props.user} />
            <UserUpdatePasswordModal />
            
        </div>
    )
}