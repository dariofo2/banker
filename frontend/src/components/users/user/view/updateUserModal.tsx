import { ChangeEvent, FormEvent, MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import { UpdateUserContext } from "./userViewContext";
import { Users } from "@/components/classes/entity/users.entity";
import { Modal } from "bootstrap";
import { UpdateUserDto } from "@/components/classes/dto/users/updateUser.dto";
import { plainToClass } from "class-transformer";
import { axiosFetchs } from "@/components/utils/axios";

class Props {
    user?: Users;
    onSubmited = ()=>{}
}

export default function UserUpdateModal (props:Props) {
    const [updateUserDTO,setUpdateUserDTO]=useState(undefined as UpdateUserDto|undefined);
    const formElement=useRef(null as HTMLFormElement|null);

    function hideUpdateUserModal () {
        Modal.getOrCreateInstance("#updateUserModal").hide();
    }

    useEffect(()=>{
        setUpdateUserDTO(plainToClass(UpdateUserDto,props.user));
    },[props.user]);

    function onChangeInput (e:ChangeEvent) {
        const inputElement=e.target as HTMLInputElement;
        setUpdateUserDTO({
            ...updateUserDTO,
            [inputElement.name]:inputElement.value
        });
    }

    async function submitForm () {
        formElement.current?.classList.add("was-validated");

        if (formElement.current?.checkValidity()) {
            await axiosFetchs.updateUser(updateUserDTO as UpdateUserDto);
            hideUpdateUserModal();
            props.onSubmited();
        }
    }

    return (
        <div className="modal fade" id="updateUserModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Usuario</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form ref={formElement} onSubmit={submitForm} noValidate >
                            <div className="form-floating">
                                <input className="form-control" type="text" name="name" value={updateUserDTO?.name} onChange={onChangeInput} placeholder="Nombre" required/>
                                <label className="form-label">Nombre</label>
                            </div>
                            <div className="form-floating">
                                <input className="form-control" type="text" name="email" value={updateUserDTO?.email} onChange={onChangeInput} placeholder="Email" required/>
                                <label className="form-label">Email</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>hideUpdateUserModal()}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={submitForm}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}