"use client"

import { CreateBlockchainAccountDTO } from "@/components/classes/dto/blockchainAccounts/createBlockchainAccount.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { CryptoUtils } from "@/components/utils/crypto";
import { Modal } from "bootstrap";
import { AES, enc } from "crypto-js";
import { ChangeEvent, useRef, useState } from "react";

class Props {
    onSubmit=()=>{}
}

export default function CreateBlockchainAccountModal(props:Props) {
    const [createBlockchainAccountDTO,setCreateBlockchainAccountDTO]=useState(null as CreateBlockchainAccountDTO|null);
    const [password1,setPassword1]=useState("" as string);
    const [password2,setPassword2]=useState("" as string);
    const formElem=useRef(null as HTMLFormElement|null);

    function onChangeInputs (e:ChangeEvent) {
        const inputElem=e.target as HTMLInputElement;
        
        switch (inputElem.name) {
            case "password1":
                setPassword1(inputElem.value);
            break;
            case "password2":
                setPassword2(inputElem.value);
            break;
            default:
                setCreateBlockchainAccountDTO({
                    ...createBlockchainAccountDTO,
                    [inputElem.name]:inputElem.value
                })
            break;
            
        }
    }

    async function submitForm () {
        const form=formElem.current as HTMLFormElement;
        form.classList.add("was-validated");
        if (form.checkValidity()) {
            //Create by Encrpyt
            setCreateBlockchainAccountDTO({
                ...createBlockchainAccountDTO,
                privatekey:CryptoUtils.encryptAES2Factor(createBlockchainAccountDTO?.privatekey as string,password1,password2)
            });

            await axiosFetchs.createBlockChainAccount(createBlockchainAccountDTO as CreateBlockchainAccountDTO);
            
            props.onSubmit();
            hideModal();
        }
    }

    function hideModal () {
        Modal.getOrCreateInstance("#createBlockchainAccountModal").hide();
        formElem.current?.classList.remove("was-validated");
        formElem.current?.reset();
    }
    return (
        <div className="modal fade" id="createBlockchainAccountModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h6 className="text-danger">Atención: ¡La Key Privada NUNCA se envía al servidor. Se usa AES-256 con dos Contraseñas y Doble cifrado y se envía cifrada, por seguridad!</h6>
                        <form ref={formElem}>
                            <div className="form-floating">
                                <input className="form-control" name="address" placeholder="Direccion de BlockChain" onChange={onChangeInputs} required></input>
                                <label className="form-label">Dirección de BlockChain</label>
                            </div>
                            <div className="form-floating">
                                <input className="form-control" name="privatekey" placeholder="Key Privada" onChange={onChangeInputs} required></input>
                                <label className="form-label">Private Key</label>
                            </div>
                            <div className="form-floating">
                                <input className="form-control" name="password1" placeholder="Contraseña 1" onChange={onChangeInputs} required></input>
                                <label className="form-label">Contraseña 1</label>
                            </div>
                            <div className="form-floating">
                                <input className="form-control" name="password2" placeholder="Contraseña 2" onChange={onChangeInputs} required></input>
                                <label className="form-label">Contraseña 2</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={hideModal}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={submitForm}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}