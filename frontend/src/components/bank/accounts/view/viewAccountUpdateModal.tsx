import { UpdateAccountDTO } from "@/components/classes/dto/accounts/updateAccount.dto"
import { Accounts } from "@/components/classes/entity/accounts.entity"
import { axiosFetchs } from "@/components/utils/axios"
import { Modal } from "bootstrap"
import { plainToClass} from "class-transformer"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Select, { SingleValue } from "react-select"

const configData = [
    {
        value:"corriente",
        label:"Corriente"
    },
    {
        value:"credito",
        label:"Crédito"
    }
];

class Props {
    account?: Accounts
    onSubmit=()=>{}
}

export default function ViewAccountUpdateModal(props: Props) {
    const [updateAccountDTO, setUpdateAccountDTO] = useState(plainToClass(UpdateAccountDTO, props.account));
    const formElem = useRef(null as HTMLFormElement|null);

    useEffect(() => {
        setUpdateAccountDTO({ ...plainToClass(UpdateAccountDTO, props.account) });
    }, [props.account]);

    function onChangeInput(newValue:SingleValue<{value:string}>) {
        setUpdateAccountDTO({
            ...updateAccountDTO,
            ['type']: newValue?.value as "corriente"|"credito"
        });
    }

    async function submitForm() {
        const form=formElem.current;
        form?.classList.add("was-validated");
        if (form?.checkValidity()) {
            await axiosFetchs.updateAccount(updateAccountDTO);
            props.onSubmit();
            hideModal();
        }
    }

    function hideModal() {
        Modal.getOrCreateInstance("#updateAccountModal").hide();
    }

    return (
        <div className="modal fade" id="updateAccountModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Actualizar Cuenta</h1>
                        <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form ref={formElem}>
                            <label>Tipo de Cuenta</label>
                            <Select placeholder="Selecciona un tipo de Cuenta" options={configData} onChange={onChangeInput} value={configData.find(x=>x.value==updateAccountDTO.type)} required />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={submitForm}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}