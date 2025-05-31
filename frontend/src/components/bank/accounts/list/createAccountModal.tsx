import { CreateAccountDTO } from "@/components/classes/dto/accounts/createAccount.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Modal } from "bootstrap";
import { ChangeEvent, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";

const optionsType = [
    {
        value: "corriente",
        label: "Corriente"
    },
    {
        value: "credito",
        label: "credito"
    }
]

class Props {
    onSubmit=()=>{}
}

export default function CreateAccountModal(props:Props) {
    const [createAccountDTO,setCreateAccountDTO] = useState(null as CreateAccountDTO|null);
    const [selectValue, setSelectValue] = useState(null as SingleValue<{value:string}>|null);
    const formElem=useRef(null as HTMLFormElement|null);

    function onChangeInput (newValue:SingleValue<{value:string}>) {
        setSelectValue(newValue);
        setCreateAccountDTO(
            {...createAccountDTO,
                ['type']:newValue?.value as "corriente"|"credito"
            }
        );
        
        console.log(createAccountDTO);
    }

    async function onSubmit () {
        const form=formElem.current;
        form?.classList.add("was-validated");
        
        if (form?.checkValidity()) {
            await axiosFetchs.createAccount(createAccountDTO as CreateAccountDTO);
        
            props.onSubmit();
            closeModal();
        }
        
    }

    function closeModal () {
        setSelectValue(null);
        Modal.getOrCreateInstance("#createAccountModal").hide();
    }
    return (
        <div className="modal fade" id="createAccountModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Cuenta Normal</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form ref={formElem}>
                            <label className="form-label"></label>
                            <Select options={optionsType} onChange={(newValue)=>onChangeInput(newValue)} value={selectValue} required/>
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
