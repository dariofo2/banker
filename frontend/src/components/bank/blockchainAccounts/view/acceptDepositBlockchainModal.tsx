import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { CryptoUtils } from "@/components/utils/crypto";
import { Web3Service } from "@/components/web3.js/web3";
import { Modal } from "bootstrap";
import { ChangeEvent, useState } from "react";

class Props {
    blockChainAccount?: BlockchainAccounts
    amountToSend?: number;
    estimateGas?: number;
    acceptSend=(privateKey:string)=>{}
}

export default function AcceptDepositBlockchainModal(props:Props) {
    const blockChainAccount=props.blockChainAccount;
    const amounToSend=props.amountToSend;

    const [passwords,setPasswords]=useState({} as {password1:string,password2:string});

    function onChangeInputs (e:ChangeEvent) {
        const inputElem=e.target as HTMLInputElement;
        setPasswords({
            ...passwords,
            [inputElem.name]:inputElem.value
        })
    }

    function getDecryptPrivateKeyToSign () {
        return CryptoUtils.decryptAES2Factor(blockChainAccount?.privatekey as string,passwords?.password1 as string,passwords?.password2 as string);
    }

    function submitForm () {
        const privateKey=getDecryptPrivateKeyToSign()
        props.acceptSend(privateKey);
        hideModal();
    }

    function hideModal () {
        (document.getElementById("passwordForm") as HTMLFormElement).reset();
        (document.getElementById("passwordForm") as HTMLFormElement).classList.remove("was-validated");
        Modal.getOrCreateInstance("#acceptBlockChainTransferModal").hide();
    }

    return (
        <div>
            <div className="modal fade" id="acceptDepositBlockchainModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Inserta tus claves Privadas</h1>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Coste de Gas Estimado:{props.estimateGas}
                            Coste en Eth:{props.amountToSend}
                            <form id="passwordForm">
                                <input className="form-control" type="text" onChange={onChangeInputs} name="password1" placeholder="Key 1" />
                                <input className="form-control" type="text" onChange={onChangeInputs} name="password2"  placeholder="Key 2"/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={submitForm}>Ingresar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}