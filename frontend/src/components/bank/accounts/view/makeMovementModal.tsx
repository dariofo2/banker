import CreateMovementDTO from "@/components/classes/dto/movements/createMovement.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Modal } from "bootstrap";
import { ChangeEvent, useRef, useState } from "react";
import Cookies from "js-cookie";
import { GetAccountDTO } from "@/components/classes/dto/accounts/getAccount.dto";
import { Accounts } from "@/components/classes/entity/accounts.entity";
import AutoNumeric from "autonumeric";
import { AutoNumericInput } from "react-autonumeric";

class Props {
    account?: Accounts;
    onSubmit=()=>{};
}
export default function CreateMovementModal(props:Props) {
    const account=props.account;
    const [createMovementDTO,setCreateMovementDTO]=useState({originAccount:{number:account?.number}} as CreateMovementDTO);
    
    const [keyRefresh,setKeyRefresh]=useState(0);
    const [amount,setAmount]=useState("0");

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
                setAmount(elem.value);
                setCreateMovementDTO({
                    ...createMovementDTO ?? {},
                    money:parseFloat(AutoNumeric.unformat(elem.value, AutoNumeric.getPredefinedOptions().Spanish).toString())
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
                            <form ref={formElem}>
                                <div className="input-group">
                                    <span className="input-group-text bi bi-cash-stack"></span>
                                    <div className="form-floating">
                                        <input className="form-control" type="text" name="number" placeholder="Numero de Cuenta" onChange={changeInput} required />
                                        <label>Numero de Cuenta</label>
                                    </div>
                                </div>
                                <div className="input-group mt-3">
                                    <span className="input-group-text bi bi-currency-euro"></span>
                                    <div className="form-floating">
                                    <AutoNumericInput inputProps={{className:"form-control", placeholder:"Dinero", defaultValue:"0,00" , name:"money",required:true,onChange:changeInput}} autoNumericOptions={AutoNumeric.getPredefinedOptions().Spanish} />
                                    <label>Dinero</label>
                                    </div>
                                </div>
                                <div className="input-group mt-3">
                                    <span className="input-group-text bi bi-pen"></span>
                                    <div className="form-floating">
                                    <input className="form-control" type="text"  name="concept" placeholder="Concepto" onChange={changeInput} required />
                                    <label>Concepto</label>
                                    </div>
                                </div>
                                
                                
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