"use client"
import { Users } from "@/components/classes/entity/users.entity";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import UserUpdateModal from "./updateUserModal";
import UserUpdatePasswordModal from "./updatePasswordModal";
import { UpdateUserContext } from "./userViewContext";
import { Modal } from "bootstrap";
import { axiosFetchs } from "@/components/utils/axios";
import { AxiosError } from "axios";
import { ToastContainer } from "react-toastify";
import UpdateUserPhotoModal from "./updatePhotoModal";
import Loading from "@/components/loading/loading";
import SocketIOClient from "@/components/socket.io/socket.io";

class Props {
    user?: Users;
}
export default function UserView () {
    const imgRef=useRef(null as HTMLImageElement|null);
    const [user,setUser]=useState(null as Users|null);

    useEffect(()=>{
        getUser();
    },[]);

    async function getUser () {
        const response=await axiosFetchs.getUser();
        setUser({
            ...response
        });
            
        (imgRef.current as HTMLImageElement).src=process.env.NEXT_PUBLIC_BACKEND_URL + "/" + response.photo as string;    
        
        
    }

    async function openUpdateForm () {
        await getUser();
        Modal.getOrCreateInstance("#updateUserModal")?.show();
    }

    async function openPhotoModal () {
        Modal.getOrCreateInstance("#updateUserPhotoModal").show();
    }

    if (!user) return (<Loading />)
        
    return (
        <div style={{margin:80}} className="text-center">
            <h2>Mi Perfil</h2>
            <div className="m-auto" style={{maxWidth:250}}>
                <img ref={imgRef} className="img-thumbnail" src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + user.photo}></img>
            </div>
            <h4>
                {user.name}
            </h4>
            <h4>{user.email}</h4>
            
            <button className="btn btn-primary" onClick={openUpdateForm}>Editar Usuario</button>
            <button className="btn btn-warning" onClick={openPhotoModal}>Actualizar Foto</button>
            <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#updateUserPasswordModal">Cambiar Contraseña</button>
            <UserUpdateModal onSubmited={async ()=>{await getUser();}} user={user} />
            <UserUpdatePasswordModal />
            <UpdateUserPhotoModal onSubmitModal={async ()=>{await getUser(); window.location.reload();}} />
            
            <SocketIOClient />
            <ToastContainer containerId="axios" position="top-center"/>
        </div>
    )
}