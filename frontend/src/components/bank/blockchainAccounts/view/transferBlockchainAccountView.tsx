import { Modal } from "bootstrap";
import { ChangeEvent, useRef, useState } from "react";
import AcceptBlockchainTransferModal from "./acceptBlockchainTransferModal";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { Web3Service } from "@/components/web3.js/web3";
import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { Transaction } from "web3";
import { AutoNumericInput } from "react-autonumeric";
import AutoNumeric from "autonumeric";
import { toast } from "react-toastify";

class Props {
    blockchainAccount: BlockchainAccounts = {}
    onSubmitModal= ()=>{}
}

export default function TransferBlockchainAccountModal(props:Props) {
    const form = useRef(null as HTMLFormElement | null);
    const blockchainAccount=props.blockchainAccount;

    const [transfer,setTransfer]=useState({address:"",amount:0});
    const [transferMode, setTransferMode]=useState(0);
    const [transactionToSend,setTransactionToSend]=useState(null as Transaction|null);
    const [estimatedGas,setEstimatedGas]=useState(0);


    async function onChange (e:ChangeEvent) {
        const inputElem=e.target as HTMLInputElement;
        switch (inputElem.name) {
            case "amount" :
                setTransfer({
                    ...transfer,
                    [inputElem.name]:parseFloat(AutoNumeric.unformat(inputElem.value,{currencySymbol:" Eth/BC"}).toString())
                })
            break;
            default:
                setTransfer({
                    ...transfer,
                    [inputElem.name]:inputElem.value
                })
            break;
        }
        
    }

    async function submitEthTransfer () {
        const formElem=form.current;
        formElem?.classList.add("was-validated");

        if (formElem?.checkValidity()) {
            const ethToWeiTransfer=Web3Service.node.utils.toWei(transfer.amount.toFixed(21),"ether");
            const transaction:Transaction={
                from:blockchainAccount.address,
                to: transfer.address,
                value: ethToWeiTransfer,
                gasPrice:await Web3Service.node.eth.getGasPrice()
            }
            
            try {
                const estimateGas=await Web3Service.node.eth.estimateGas(transaction);
                setTransactionToSend(transaction);
                setEstimatedGas(parseInt(estimateGas.toString()));
                showAcceptModal();
            } catch {
                toast.error("Error en Saldo o Cuenta Destino incorrecta",{containerId:"axios"})
            }
        }
    }

    async function submitBCTransfer () {
        const formElem=form.current;
        formElem?.classList.add("was-validated");

        if (formElem?.checkValidity()) {
            const eurToBC=transfer.amount*100;
            try {
                const transaction=await buildingsContract.transferTo(blockchainAccount.address as string,transfer.address,eurToBC);
            
                const estimateGas=await Web3Service.node.eth.estimateGas(transaction);
                setTransactionToSend(transaction);
                setEstimatedGas(parseInt(estimateGas.toString()));
                showAcceptModal();
            } catch (error){
                toast.error("Error en Saldo o Cuenta Destino incorrecta",{containerId:"axios"});
            }
        }
        
    }


    async function sendTransfer (privateKey:string) {
        try {
            const signedTransaction=await Web3Service.node.eth.accounts.signTransaction(transactionToSend as Transaction,privateKey);
            await Web3Service.node.eth.sendSignedTransaction(signedTransaction.rawTransaction);
            
            toast.success("Transferencia Enviada con Éxito",{containerId:"axios"})
            props.onSubmitModal();
            hideModal()
        } catch {
            toast.error("Error al Enviar la Transacción",{containerId:"axios"})
        }
    }
    
    async function showAcceptModal () {
        Modal.getOrCreateInstance("#acceptBlockChainTransferModal").show();
    }

    async function hideModal () {
        form.current?.reset();
        Modal.getOrCreateInstance("#transferModal").hide();
    }
    return (
        <div>
            <div className="modal fade" id="transferModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Transferencia</h1>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className="" ref={form}>
                                <input className="form-control" name="address" placeholder="address" onChange={onChange} required></input>
                                {/*<input className="form-control" name="amount" placeholder="amount" onChange={onChange} required></input>*/}
                                <AutoNumericInput inputProps={{className:"form-control",name:"amount", required:true,onChange:onChange} } autoNumericOptions={{ suffixText:" Eth/BC"}} />
                            </form>
                                <button className="btn btn-primary" onClick={submitEthTransfer}>Send Eth</button>
                                <button className="btn btn-primary" onClick={submitBCTransfer}>Send BC</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <AcceptBlockchainTransferModal blockChainAccount={blockchainAccount as BlockchainAccounts} estimateGas={estimatedGas} amountToSend={transfer.amount} acceptSend={(privateKey) => { sendTransfer(privateKey) }} />
        </div>
    );
}