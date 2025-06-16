import { Accounts } from "@/components/classes/entity/accounts.entity";
import { Modal } from "bootstrap";

class Props {
    account?: Accounts
    onSubmit=()=>{}
}
export default function ConfirmAccountsListAdmin (props:Props) {
    const account=props.account;

    async function onOk () {
        props.onSubmit()
        hideModal();
    }
    async function hideModal () {
        Modal.getOrCreateInstance("#confirmAccountsListAdminModal").hide();
    }
    return (
        <div className="modal fade" id="confirmAccountsListAdminModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Usuario</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>Esta Seguro de querer {account?.type=="blocked" ? "Desbloquear" : "Bloquear" } Esta cuenta número {account?.number}</div>
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