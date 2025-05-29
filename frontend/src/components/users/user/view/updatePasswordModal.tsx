"use client"

import { UpdateUserPasswordDTO } from "@/components/classes/dto/users/updateUserPassword.dto"
import { axiosFetchs } from "@/components/utils/axios";
import { CryptoUtils } from "@/components/utils/crypto";
import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify";

export default function UserUpdatePasswordModal() {
    const [updatePasswordDTO, setUpdatePasswordDTO]=useState({} as UpdateUserPasswordDTO);
    const [passwordRepeat, setPasswordRepeat]=useState("" as string);

    function onChangeInputs (e:ChangeEvent) {
        const elem=e.target as HTMLInputElement;
        
        setUpdatePasswordDTO(
            {
            ...updatePasswordDTO,
            [elem.name]:elem.value
            }
        )
    }

    function onChangePasswordRepeat (e:ChangeEvent) {
        const elem=e.target as HTMLInputElement;
        setPasswordRepeat(elem.value);
    }

    async function submitForm (e:FormEvent) {
        const form=e.target as HTMLFormElement; 
        form.classList.add("was-validated");

        if (form.checkValidity()) {
            if (checkPasswords()) {
                updatePasswordDTO.lastPassword=CryptoUtils.hashPasswordToSha256(updatePasswordDTO.lastPassword as string);
                updatePasswordDTO.password=CryptoUtils.hashPasswordToSha256(updatePasswordDTO.password as string);

                const response = await axiosFetchs.updateUserPassword(updatePasswordDTO);
                if (response instanceof AxiosError) {
                    const messageErrors : string[]=(response.response?.data as any).message;
                    messageErrors.forEach(x => {
                        toast(x,{
                            type:"error"
                        });
                    });
                } else {
                    toast("Contraseña Actualizada!",{
                        type:"success"
                    });
                }
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
                        <form onSubmit={e=>submitForm(e)} noValidate>
                            <label>Contraseña Actual</label>
                            <input type="password" className="form-control" name="lastPassword" placeholder="Contraseña Actual..." onChange={e=>onChangeInputs(e)} required />
                            <label>Nueva Contraseña</label>
                            <input type="password" className="form-control" name="Password" placeholder="Nueva Contraseña..." onChange={e=>onChangeInputs(e)} required />
                            <label>Repite Contraseña</label>
                            <input type="password" className="form-control" name="repeatPassword" placeholder="Repite Contraseña..." onChange={e=>onChangePasswordRepeat(e)} required />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}