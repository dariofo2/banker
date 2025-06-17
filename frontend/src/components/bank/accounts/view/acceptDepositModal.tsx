import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { CryptoUtils } from "@/components/utils/crypto";
import { Web3Service } from "@/components/web3.js/web3";
import { Modal } from "bootstrap";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

class Props {
    blockChainAccount?: BlockchainAccounts;
    amountToSend?: number;
    estimateGas = "";
    acceptDeposit = (privateKey: string) => { }
}
export default function AcceptDepositModal(props: Props) {
    const blockChainAccount = props.blockChainAccount;
    const amounToSend = props.amountToSend;

    const formElement=useRef(null as HTMLFormElement|null);

    const [passwords, setPasswords] = useState({} as { password1: string, password2: string });

    function onChangeInputs(e: ChangeEvent) {
        const inputElem = e.target as HTMLInputElement;
        setPasswords({
            ...passwords,
            [inputElem.name]: inputElem.value
        })
    }

    function getDecryptPrivateKeyToSign() {
        return CryptoUtils.decryptAES2Factor(blockChainAccount?.privatekey as string, passwords?.password1 as string, passwords?.password2 as string);
    }

    function submitFormforDeposit() {
        const form=formElement.current as HTMLFormElement;
        form.classList.add("was-validated");
        if (form.checkValidity()) {
            form.classList.remove("was-validated");
            try {
                const privateKey = getDecryptPrivateKeyToSign()
                props.acceptDeposit(privateKey);
                hideModal();
            } catch {
                toast.error("Saldo Insuficiente",{containerId:"axios"})
            }
        }
        
    }

    function hideModal() {
        (document.getElementById("passwordForm") as HTMLFormElement).reset();
        Modal.getOrCreateInstance("#acceptDepositModal").hide();
    }

    return (
        <div>
            <div className="modal fade" id="acceptDepositModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Inserta tus claves Privadas</h1>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>Gas Estimado: {props.estimateGas}</h6>
                            <form ref={formElement} id="passwordForm">

                                <div className="input-group">
                                    <span className="input-group-text bi bi-key-fill text-warning"></span>
                                    <div className="form-floating">
                                        <input className="form-control" type="password" onChange={onChangeInputs} name="password1" placeholder="Key 1" required />
                                        <label>Key 1</label>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text bi bi-key-fill text-warning"></span>
                                    <div className="form-floating">
                                        <input className="form-control" type="password" onChange={onChangeInputs} name="password2" placeholder="Key 2" required />
                                        <label>Key 2</label>
                                </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={submitFormforDeposit}>Deposit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}