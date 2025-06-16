import { CreateAccountDTO } from "@/components/classes/dto/accounts/createAccount.dto";
import { UpdateUserAdminDTO } from "@/components/classes/dto/users/updateUserAdmin.dto";
import { Users } from "@/components/classes/entity/users.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { CryptoUtils } from "@/components/utils/crypto";
import { Modal } from "bootstrap";
import { plainToClass } from "class-transformer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";

class Props {
    user: Users={};
    onSubmit=()=>{}
}

export default function UpdateUsersPasswordListAdmin (props:Props) {
    //const [updateUserAdminDTO,setUpdateUserAdminDTO] = useState(null as UpdateUserAdminDTO|null);
    const [userToUpdate,setUserToUpdate] = useState(props.user as Users|null);
    const formElem=useRef(null as HTMLFormElement|null);

    useEffect(()=>{
        setUserToUpdate({...props.user});
    },[props.user]);

    function onChangeInput (e:ChangeEvent) {
        const inputElem=e.target as HTMLInputElement;
        setUserToUpdate({
            ...userToUpdate,
            [inputElem.name]:inputElem.value
        });
        
    }

    async function onSubmit () {
        const form=formElem.current;
        form?.classList.add("was-validated");
        
        if (form?.checkValidity()) {
            form.classList.remove("was-validated");
            const userToUpdateAdminDTO=plainToClass(UpdateUserAdminDTO,userToUpdate);
            userToUpdateAdminDTO.password= CryptoUtils.hashPasswordToSha256(userToUpdateAdminDTO.password as string);

            await axiosFetchs.adminUpdateUserPassword(userToUpdateAdminDTO);
        
            props.onSubmit();
            closeModal();
        }
        
    }

    function closeModal () {
        formElem.current?.reset();
        Modal.getOrCreateInstance("#updateUserPasswordAdminModal").hide();
    }
    return (
        <div className="modal fade" id="updateUserPasswordAdminModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Contraseña</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form ref={formElem}>
                            <div className="form-floating">
                                <input type="text" className="form-control" name="password" onChange={onChangeInput} placeholder="Nombre" required></input>
                                <label className="form-label">Contraseña</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={(onSubmit)}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}