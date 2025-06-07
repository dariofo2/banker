import { Modal } from "bootstrap";
import { ChangeEvent, useRef, useState } from "react";
import AcceptBlockchainTransferModal from "./acceptBlockchainTransferModal";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { Web3Service } from "@/components/web3.js/web3";
import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { Transaction } from "web3";

class Props {
    blockchainAccount: BlockchainAccounts = {}

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
        setTransfer({
            ...transfer,
            [inputElem.name]:inputElem.value
        })
    }

    async function submitEthTransfer () {
        const formElem=form.current;
        formElem?.classList.add("was-validated");

        if (formElem?.checkValidity()) {
            const transaction:Transaction={
                from:blockchainAccount.address,
                to: transfer.address,
                value: transfer.amount,
                gasPrice:await Web3Service.node.eth.getGasPrice()
            }
            
            const estimateGas=await Web3Service.node.eth.estimateGas(transaction);
            setTransactionToSend(transaction);
            setEstimatedGas(parseInt(estimateGas.toString()));
            showAcceptModal();
        }
    }

    async function submitBCTransfer () {
        const formElem=form.current;
        formElem?.classList.add("was-validated");

        if (formElem?.checkValidity()) {
            const data=await buildingsContract.transferTo(transfer.address,transfer.amount);
            const transaction:Transaction={
                from:blockchainAccount.address,
                to: buildingsContract.contractBuildingsAddress,
                data: data.encodeABI(),
                gasPrice:await Web3Service.node.eth.getGasPrice()
            }
            const estimateGas=await Web3Service.node.eth.estimateGas(transaction);
            setTransactionToSend(transaction);
            setEstimatedGas(parseInt(estimateGas.toString()));
            showAcceptModal();
        }
        
    }


    async function sendTransfer (privateKey:string) {
        const signedTransaction=await Web3Service.node.eth.accounts.signTransaction(transactionToSend as Transaction,privateKey);
        await Web3Service.node.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        
        hideModal()
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
                                <input className="form-control" name="amount" placeholder="amount" onChange={onChange} required></input>
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