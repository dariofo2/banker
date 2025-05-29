import { ChangeEvent, useContext, useState } from "react";
import { UpdateUserContext } from "./userViewContext";
import { Users } from "@/components/classes/entity/users.entity";
import { Modal } from "bootstrap";

class Props {
    user?: Users;
}
export default function UserUpdateModal (props:Props) {
    const user=props.user as Users;
    const [userUpdate,setUserUpdate]=useState(props.user);
    
    function changeUserUpdate (e:ChangeEvent) {
        const inputElement=e.target as HTMLInputElement;
        setUserUpdate({
            ...userUpdate,
            [inputElement.name]:inputElement.value
        });
    }
    
    function hideUpdateUserModal () {
        setUserUpdate(props.user);
        Modal.getOrCreateInstance("#updateUserModal").hide();
    }

    return (
        <div className="modal fade" id="updateUserModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-floating">
                                <label className="form-label">Nombre</label>
                                <input className="form-control" type="text" name="name" value={userUpdate?.name} onChange={e=>changeUserUpdate(e)} placeholder="Nombre" />
                            </div>
                            <div className="form-floating">
                                <label className="form-label">Email</label>
                                <input className="form-control" type="text" name="email" value={userUpdate?.email} onChange={e=>changeUserUpdate(e)} placeholder="Email" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>hideUpdateUserModal()}>Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}