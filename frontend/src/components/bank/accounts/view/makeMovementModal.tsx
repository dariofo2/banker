import CreateMovementDTO from "@/components/classes/dto/movements/createMovement.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Modal } from "bootstrap";
import { ChangeEvent, useRef, useState } from "react";
import Cookies from "js-cookie";
import { GetAccountDTO } from "@/components/classes/dto/accounts/getAccount.dto";
import { Accounts } from "@/components/classes/entity/accounts.entity";

class Props {
    account?: Accounts;
    onSubmit=()=>{};
}
export default function CreateMovementModal(props:Props) {
    const account=props.account;
    const [createMovementDTO,setCreateMovementDTO]=useState({originAccount:{number:account?.number}} as CreateMovementDTO);
    const formElem=useRef(null as HTMLFormElement|null);
    

    function changeInput (e:ChangeEvent) {
        const elem=e.target as HTMLInputElement

        switch (elem.name) {
            case "number":
                setCreateMovementDTO({
                    ...createMovementDTO?? {},
                    destinationAccount:{
                        number:elem.value
                    }
                })
                
            break;
            case "money":
                setCreateMovementDTO({
                    ...createMovementDTO ?? {},
                    money:parseInt(elem.value)
                });
            break;
            case "concept":
                setCreateMovementDTO({
                    ...createMovementDTO ?? {},
                    concept:elem.value
                })
            break;
        }
    }

    async function submitForm () {
        const form=formElem.current;
        form?.classList.add("was-validated");
        if (form?.checkValidity()) {
            try {
                //Create Movement Fetch
                await axiosFetchs.createMovement(createMovementDTO as CreateMovementDTO);
                hideModal();
                props.onSubmit();       
            } catch (error) {
                form.classList.remove("was-validated"); 
            }
            
        }
    }

    function hideModal () {
        formElem.current?.reset();
        formElem.current?.classList.remove("was-validated"); 
        Modal.getOrCreateInstance("#createMovementModal").hide();
    }
    return (
        <div>
            <div className="modal fade" id="createMovementModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Transferencia</h1>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="" ref={formElem}>
                                <input className="form-control" type="text" name="number" placeholder="Numero de Cuenta" onChange={changeInput} required />
                                <input className="form-control" type="text"  name="money" placeholder="Dinero" onChange={changeInput} required />
                                <input className="form-control" type="text"  name="concept" placeholder="Concepto" onChange={changeInput} required />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={submitForm}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}