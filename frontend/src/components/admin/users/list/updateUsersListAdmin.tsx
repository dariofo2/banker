import { CreateAccountDTO } from "@/components/classes/dto/accounts/createAccount.dto";
import { UpdateUserAdminDTO } from "@/components/classes/dto/users/updateUserAdmin.dto";
import { Users } from "@/components/classes/entity/users.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { Modal } from "bootstrap";
import { plainToClass } from "class-transformer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";

class Props {
    user? : Users={};
    onSubmit=()=>{}
}

export default function UpdateUsersListAdmin (props:Props) {
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
            const userToUpdateDTO=plainToClass(UpdateUserAdminDTO,userToUpdate);

            await axiosFetchs.adminUpdateUser(userToUpdateDTO);
        
            props.onSubmit();
            closeModal();
        }
        
    }

    function closeModal () {
        Modal.getOrCreateInstance("#updateUserAdminModal").hide();
    }
    return (
        <div className="modal fade" id="updateUserAdminModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Usuario</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form ref={formElem}>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" name="name" onChange={onChangeInput} value={userToUpdate?.name} placeholder="Nombre" required></input>
                                <label className="form-label">Nombre</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" name="email" onChange={onChangeInput} value={userToUpdate?.email} placeholder="Email" required></input>
                                <label className="form-label">Email</label>
                            </div>
                            <label className="mt-3">Rol</label>
                            <div className="form-check">
                                
                                <label className="form-check-label">Usuario</label>
                                <input type="radio" className="form-check-input" name="role" value="1" onChange={onChangeInput} checked={userToUpdate?.role==1} required></input>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">Administrador</label>
                                <input type="radio" className="form-check-input" name="role" value="2" onChange={onChangeInput} checked={userToUpdate?.role==2} required></input>
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