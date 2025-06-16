import { Accounts } from "@/components/classes/entity/accounts.entity";
import { Movements } from "@/components/classes/entity/movements.entity";
import { Modal } from "bootstrap";

class Props {
    movement?: Movements
    onSubmit=()=>{}
}
export default function ConfirmMovementsDeleteListAdmin (props:Props) {
    const movement=props.movement;

    async function onOk () {
        props.onSubmit()
        hideModal();
    }
    async function hideModal () {
        Modal.getOrCreateInstance("#confirmMovementDeleteAdminModal").hide();
    }
    return (
        <div className="modal fade" id="confirmMovementDeleteAdminModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Usuario</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>Esta Seguro de querer Borrar esta Transferencia de {movement?.money}</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={hideModal}>No</button>
                        <button type="button" className="btn btn-primary" onClick={onOk}>Si</button>
                    </div>
                </div>
            </div>
        </div>
    );
}