"use client"

import { UpdateUserPasswordDTO } from "@/components/classes/dto/users/updateUserPassword.dto"
import { axiosFetchs } from "@/components/utils/axios";
import { CryptoUtils } from "@/components/utils/crypto";
import { AxiosError } from "axios";
import { Modal } from "bootstrap";
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify";

export default function UserUpdatePasswordModal() {
    const [updatePasswordDTO, setUpdatePasswordDTO]=useState({password:"",lastPassword:""} as UpdateUserPasswordDTO);
    const [passwordRepeat, setPasswordRepeat]=useState("" as string);
    const formElement=useRef(null as HTMLFormElement|null);

    function onChangeInputs (e:ChangeEvent) {
        const elem=e.target as HTMLInputElement;
        
        setUpdatePasswordDTO(
            {
            ...updatePasswordDTO,
            [elem.name]:elem.value
            }
        )
    }

    function resetStates () {
        setUpdatePasswordDTO({password:"",lastPassword:""});
        setPasswordRepeat("");
    }

    function hideModal () {
        Modal.getOrCreateInstance("#updateUserPasswordModal").hide();
        resetStates();
    }

    function onChangePasswordRepeat (e:ChangeEvent) {
        const elem=e.target as HTMLInputElement;
        setPasswordRepeat(elem.value);
    }

    async function submitForm (e:FormEvent) {
        const form=formElement.current;
        form?.classList.add("was-validated");
        
        if (form?.checkValidity()) {
            if (checkPasswords()) {
                updatePasswordDTO.lastPassword=CryptoUtils.hashPasswordToSha256(updatePasswordDTO.lastPassword as string);
                updatePasswordDTO.password=CryptoUtils.hashPasswordToSha256(updatePasswordDTO.password as string);
                try {
                const response = await axiosFetchs.updateUserPassword(updatePasswordDTO);
                resetStates();
                hideModal();
                } catch (error) {
                    
                }
            } else {
                toast.error("Las Contraseñas no coinciden, vuelva a intentarlo",{containerId:"axios"})
            }
        }
    }

    function checkPasswords () {
        return updatePasswordDTO.password==passwordRepeat;
    }
    
    return (
        <div className="modal fade" id="updateUserPasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Actualizar Contraseña</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={e=>submitForm(e)} ref={formElement} noValidate>
                            <label>Contraseña Actual</label>
                            <input type="password" className="form-control" name="lastPassword" placeholder="Contraseña Actual..." onChange={e=>onChangeInputs(e)} value={updatePasswordDTO.lastPassword} required />
                            <label>Nueva Contraseña</label>
                            <input type="password" className="form-control" name="password" placeholder="Nueva Contraseña..." onChange={e=>onChangeInputs(e)} value={updatePasswordDTO.password} required />
                            <label>Repite Contraseña</label>
                            <input type="password" className="form-control" name="repeatPassword" placeholder="Repite Contraseña..." onChange={e=>onChangePasswordRepeat(e)} value={passwordRepeat} required />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={hideModal}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={submitForm}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>

    )
}