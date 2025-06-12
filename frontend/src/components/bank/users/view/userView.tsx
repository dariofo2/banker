"use client"
import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UserUpdateModal from "./updateUserModal";
import UserUpdatePasswordModal from "./updatePasswordModal";
import { UpdateUserContext } from "./userViewContext";
import { Modal } from "bootstrap";
import { axiosFetchs } from "@/components/utils/axios";
import { AxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import UpdateUserPhotoModal from "./updatePhotoModal";

class Props {
    user?: Users;
}
export default function UserView () {
    const [user,setUser]=useState(null as Users|null);
    const [key,setKey]=useState(0);

    useEffect(()=>{
        getUser();
    },[]);

    async function getUser () {
        const response=await axiosFetchs.getUser();
        setUser({
            ...response
        });
        setKey(key+1);
    }

    async function openUpdateForm () {
        await getUser();
        Modal.getOrCreateInstance("#updateUserModal")?.show();
    }

    async function openPhotoModal () {
        Modal.getOrCreateInstance("#updateUserPhotoModal").show();
    }

    if (!user) return (<div style={{margin:500}}>Loading...</div>)
    return (
        <div style={{margin:80}}>
            <div className="m-auto" style={{maxWidth:250}}>
                <img key={key} className="img-thumbnail" src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + user.photo}></img>
            </div>
            <h2>
                {}
                Nombre Usuario {user.name}
            </h2>
            <h2> Email Usuario {user.email}</h2>
            
            <button className="btn btn-primary" onClick={openUpdateForm}>Editar Usuario</button>
            <button className="btn btn-warning" onClick={openPhotoModal}>Actualizar Foto</button>
            <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#updateUserPasswordModal">Cambiar Contraseña</button>
            <UserUpdateModal onSubmited={async ()=>{await getUser(); window.location.reload()}} user={user} />
            <UserUpdatePasswordModal />
            <UpdateUserPhotoModal onSubmitModal={async ()=>{await getUser(); window.location.reload()}} />
            
            <ToastContainer containerId="axios" position="top-center"/>
        </div>
    )
}