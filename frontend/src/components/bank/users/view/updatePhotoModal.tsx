"use client"
import { UpdateUserPhotoDTO } from "@/components/classes/dto/users/updateUserPhoto.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";

export default function UpdateUserPhotoModal () {
    const formElement=useRef(null as HTMLFormElement|null);
    const inputPhotoElement=useRef(null as HTMLInputElement|null);

    useEffect(()=>{
    },[])

    async function submitForm () {
        const inputPhoto= inputPhotoElement.current as HTMLInputElement;
        const file=(inputPhoto.files as FileList)[0]
        const fileBase64=await convertFileToBase64(file);
        console.log(fileBase64);

        const updatePhotoDTO: UpdateUserPhotoDTO = {
            photo: fileBase64
        }

        axiosFetchs.updateUserPhoto(updatePhotoDTO);
        hideModal();
    }

    async function convertFileToBase64 (file:File) {
        return new Promise<string>((resolve)=>{
            const reader=new FileReader();
            reader.readAsDataURL(file)
            reader.onload=()=>resolve(reader.result as string);
        })
        
        
    }

    function hideModal () {
        Modal.getOrCreateInstance("#updateUserPhotoModal").hide();
    }
    return (
        <div>
            <div className="modal fade" id="updateUserPhotoModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Actualizar Contraseña</h1>
                        <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submitForm} ref={formElement} noValidate>
                            <label>Sube una Foto</label>
                            <input ref={inputPhotoElement} type="file" className="form-control" name="photo" id="photo" placeholder="Subir Foto..." required />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={hideModal}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={submitForm}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}