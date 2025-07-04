"use client"

import { CreateBlockchainAccountDTO } from "@/components/classes/dto/blockchainAccounts/createBlockchainAccount.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { CryptoUtils } from "@/components/utils/crypto";
import { Web3Service } from "@/components/web3.js/web3";
import { Modal } from "bootstrap";
import { plainToClass } from "class-transformer";
import { AES, enc } from "crypto-js";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Transaction } from "web3";

class Props {
    onSubmit = () => { }
}

export default function CreateBlockchainAccountModal(props: Props) {
    const [createBlockchainAccountDTO, setCreateBlockchainAccountDTO] = useState(null as CreateBlockchainAccountDTO | null);
    const [password1, setPassword1] = useState("" as string);
    const [password2, setPassword2] = useState("" as string);
    const formElem = useRef(null as HTMLFormElement | null);

    function onChangeInputs(e: ChangeEvent) {
        const inputElem = e.target as HTMLInputElement;

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
                    [inputElem.name]: inputElem.value
                })
                break;

        }
    }

    /**
     * Make a Transaction to Check in Backend Account Validity
     */
    async function makeTransaction() {
        try {
            const transaction: Transaction = {
                from: createBlockchainAccountDTO?.address,
                to: Web3Service.bankerAddress,
                value: 1,
                gasPrice: await Web3Service.node.eth.getGasPrice()
            }
            const signedTransaction = await Web3Service.node.eth.accounts.signTransaction(transaction, createBlockchainAccountDTO?.privatekey as string);

            return signedTransaction
        } catch (error) {
            toast.error("Error! La cuenta o Key Privada no son válidas", {
                containerId: "axios"
            });
            throw error;
        }


    }
    async function submitForm() {
        const form = formElem.current as HTMLFormElement;
        form.classList.add("was-validated");
        if (form.checkValidity()) {
            //Create by Encrpyt
            form.classList.remove("was-validated");
            const createDTO = plainToClass(CreateBlockchainAccountDTO, createBlockchainAccountDTO);
            createDTO.privatekey = CryptoUtils.encryptAES2Factor(createBlockchainAccountDTO?.privatekey as string, password1, password2);
            createDTO.signedTransaction = await makeTransaction();

            await axiosFetchs.createBlockChainAccount(createDTO);

            props.onSubmit();
            hideModal();
        }
    }

    function hideModal() {
        Modal.getOrCreateInstance("#createBlockchainAccountModal").hide();
        formElem.current?.classList.remove("was-validated");
        formElem.current?.reset();
    }

    return (
        <div className="modal fade" id="createBlockchainAccountModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Cuenta Blockchain</h1>
                        <button type="button" className="btn-close" onClick={hideModal}  aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form ref={formElem}>
                            <div className="input-group mt-3">
                                <span className="input-group-text bi bi-cash-stack"></span>
                                <div className="form-floating">
                                    <input className="form-control" name="address" placeholder="Direccion de BlockChain" onChange={onChangeInputs} required></input>
                                    <label className="form-label">Dirección de BlockChain</label>
                                </div>
                            </div>
                            <div className="input-group mt-3">
                                <span className="input-group-text bi bi-key-fill"></span>
                                <div className="form-floating">
                                    <input className="form-control" name="privatekey" placeholder="Key Privada" onChange={onChangeInputs} required></input>
                                    <label className="form-label">Private Key</label>
                                </div>
                            </div>
                            <div className="input-group mt-3">
                                <span className="input-group-text bi bi-key-fill"></span>
                                <div className="form-floating">
                                    <input className="form-control" name="password1" type="password" placeholder="Contraseña 1" onChange={onChangeInputs} required></input>
                                    <label className="form-label">Contraseña 1</label>
                                </div>
                            </div>
                            <div className="input-group mt-3">
                                <span className="input-group-text bi bi-key-fill"></span>
                                <div className="form-floating">
                                    <input className="form-control" name="password2" type="password" placeholder="Contraseña 2" onChange={onChangeInputs} required></input>
                                    <label className="form-label">Contraseña 2</label>
                                </div>
                            </div>
                        </form>
                        <h6 className="text-danger fs-6 mt-3">Atención: ¡La Key Privada NUNCA se envía al servidor. Se usa AES-256 con dos Contraseñas y Doble cifrado y se envía cifrada, por seguridad!</h6>
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