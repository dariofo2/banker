import CreateMovementDTO from "@/components/classes/dto/movements/createMovement.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Modal } from "bootstrap";
import { useRef, useState } from "react";

export default function CreateMovementModal() {
    const [createMovementDTO,setMovementDTO]=useState(null as CreateMovementDTO|null);
    const formElem=useRef(null as HTMLFormElement|null);

    function changeInput () {

    }

    async function submitForm () {
        const form=formElem.current;
        form?.classList.add("was-validated");
        if (form?.checkValidity()) {
            try {
                await axiosFetchs.createMovement(createMovementDTO as CreateMovementDTO);
            } catch (error) {
                form.classList.remove("was-validated");
            }
        }
    }

    function hideModal () {
        formElem.current?.reset();
        Modal.getOrCreateInstance("#createMovementModal").hide();
    }
    return (
        <div>
            <div className="modal fade" id="createMovementModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Transferencia</h1>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form ref={formElem}>
                                <input type="text" name="number" placeholder="Numero de Cuenta"></input>
                                <input type="text" name="money" placeholder="Dinero"></input>
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