import { Modal } from "bootstrap";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AcceptBlockchainTransferModal from "./acceptBlockchainTransferModal";
import { buildingsContract } from "@/components/web3.js/contractBuildings";
import { Web3Service } from "@/components/web3.js/web3";
import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { Transaction } from "web3";
import { Accounts } from "@/components/classes/entity/accounts.entity";
import { DepositToBlockChainDTO } from "@/components/classes/dto/blockchainAccounts/depositToBlockchain.dto";
import { axiosFetchs } from "@/components/utils/axios";
import Select, { SingleValue } from "react-select";
import { AutoNumericInput } from "react-autonumeric";
import AutoNumeric from "autonumeric";

class Props {
    blockchainAccount?: BlockchainAccounts;
    onSubmitModal= ()=>{};
}

export default function DepositBlockchainAccountModal(props:Props) {
    const form = useRef(null as HTMLFormElement | null);
    const blockchainAccount=props.blockchainAccount;

    const [accounts,setAccounts]=useState(null as Accounts[]|null);
    const [selectedAccount,setSelectedAccount]=useState(null as Accounts|null);

    const [depositToBlockchainAccountDTO,setDepositToBlockchainAccountDTO]=useState({toBlockChainAccountAddress:blockchainAccount?.address} as DepositToBlockChainDTO|null);

    const [transfer,setTransfer]=useState({address:"",amount:0});
    const [transferMode, setTransferMode]=useState(0);
    const [transactionToSend,setTransactionToSend]=useState(null as Transaction|null);
    const [estimatedGas,setEstimatedGas]=useState(0);

    useEffect(()=>{
        getAccounts();
    },[])

    useEffect(()=>{
        setDepositToBlockchainAccountDTO({
            ...depositToBlockchainAccountDTO,
            toBlockChainAccountAddress:blockchainAccount?.address
        })
    },[props.blockchainAccount])

    async function getAccounts () {
        const response=await axiosFetchs.fetchAccounts()
        setAccounts([
            ...response
        ]);
    }

    async function onChange (e:ChangeEvent) {
        const inputElem=e.target as HTMLInputElement;
        setDepositToBlockchainAccountDTO({
            ...depositToBlockchainAccountDTO,
            [inputElem.name]:parseFloat(AutoNumeric.unformat(inputElem.value,AutoNumeric.getPredefinedOptions().Spanish).toString()) 
        });
        
    }

    async function onChangeSelect (newValue:SingleValue<{value:Accounts,label:string}>) {
        setSelectedAccount({...newValue?.value})
        setDepositToBlockchainAccountDTO({
            ...depositToBlockchainAccountDTO,
            fromNormalAccountId:newValue?.value.id,
        })
    }

    async function submitEthTransfer () {
        const formElem=form.current;
        formElem?.classList.add("was-validated");

        if (formElem?.checkValidity()) {
            await axiosFetchs.depositToEthBlockChainAccount(depositToBlockchainAccountDTO as DepositToBlockChainDTO);
            props.onSubmitModal();
            hideModal();
        }
    }

    async function submitBCTransfer () {
        const formElem=form.current;
        formElem?.classList.add("was-validated");

        if (formElem?.checkValidity()) {
            await axiosFetchs.depositToBCBlockChainAccount(depositToBlockchainAccountDTO as DepositToBlockChainDTO);
            props.onSubmitModal();
            hideModal();
        }
        
    }


    /*
    async function sendTransfer (privateKey:string) {
        const signedTransaction=await Web3Service.node.eth.accounts.signTransaction(transactionToSend as Transaction,privateKey);
        await Web3Service.node.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        
        hideModal()
    }
    
    async function showAcceptModal () {
        Modal.getOrCreateInstance("#acceptBlockChainTransferModal").show();
    }
    */
    async function hideModal () {
        form.current?.reset();
        form.current?.classList.remove("was-validated");
        setSelectedAccount({...{}});
        Modal.getOrCreateInstance("#depositBlockchainModal").hide();
    }

    const selectAccountsItems= accounts?.map(x=>{
        return {value:x,label:x.number as string}
    })

    return (
        <div>
            <div className="modal fade" id="depositBlockchainModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Ingresar desde Cuenta Normal</h1>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form ref={form}>
                                <label>Selecciona Cuenta</label>
                                <Select options={selectAccountsItems} styles={{menu: provided => ({...provided,zIndex:500})}} placeholder="Selecciona una cuenta Normal" onChange={onChangeSelect} value={selectAccountsItems?.find(x=>x.label==selectedAccount?.number) ?? null}  required />
                                {/*<input className="form-control" name="amounttt" placeholder="amount" onChange={onChange} required></input>*/}
                                <div className="input-group mt-3 mb-3">
                                    <span className="input-group-text bi bi-cash-stack"></span>
                                    <AutoNumericInput inputProps={{className:"form-control", id:"amount", name:"amount", required:true,defaultValue:"0,00", onChange:onChange}} autoNumericOptions={AutoNumeric.getPredefinedOptions().Spanish} />
                                </div>
                            </form>
                                <button className="btn btn-primary me-2" onClick={submitEthTransfer}>Deposit Eth</button>
                                <button className="btn btn-primary" onClick={submitBCTransfer}>Deposit BC</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <AcceptBlockchainTransferModal blockChainAccount={blockchainAccount as BlockchainAccounts} estimateGas={estimatedGas} amountToSend={transfer.amount} acceptSend={(privateKey) => { sendTransfer(privateKey) }} /> */}
        </div>
    );
}