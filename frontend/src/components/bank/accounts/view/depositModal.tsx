import { DepositFromBlockChainDTO } from "@/components/classes/dto/blockchainAccounts/depositFromBlockchain.dto";
import { GetBlockchainAccountDTO } from "@/components/classes/dto/blockchainAccounts/getBlockChainAccount.dto";
import { Accounts } from "@/components/classes/entity/accounts.entity";
import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { Web3Service } from "@/components/web3.js/web3";
import { Modal } from "bootstrap";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import AcceptDepositModal from "./acceptDepositModal";
import { buildingsContract } from "@/components/web3.js/contractBuildings";

class Props {
    account?:Accounts
    blockchainAccounts?: BlockchainAccounts[]
} 

export default function DepositModal(props:Props) {
    const formElem=useRef(null as HTMLFormElement|null);
    const account=props.account;
    
    //const [getBlockChainAccountDTO,setGetBlockChainAccountDTO]=useState(null as GetBlockchainAccountDTO|null);
    const [blockchainAccounts,setBlockchainAccounts] = useState(null as BlockchainAccounts[]|null);
    const [selectedBlockchainAccount,setSelectedBlockchainAccount]= useState(null as BlockchainAccounts|null);
    const [depositFromBlockchainAccountDTO,setDepositFromBlockchainaccountDTO]=useState({toAccountId:account?.id} as DepositFromBlockChainDTO);
    const [balanceSelectedAccount,setBalanceSelectedAccount]=useState(null as string|null);
    const [amountToSend,setAmountToSend]=useState(0 as number);
    const [estimatedGas,setEstimatedGas]=useState("" as string);

    useEffect(()=>{
        getBlockChainAccounts()
    },[])

    useEffect(()=>{
        if (selectedBlockchainAccount) estimateGas()
    },[selectedBlockchainAccount])


    async function getBlockChainAccounts() {
        const response=await axiosFetchs.listBlockChainAccounts();
        setBlockchainAccounts([...response]);
    }

    //function onChange
    async function onChangeSelect (newValue:SingleValue<{value:BlockchainAccounts,label:string}>) {
        setSelectedBlockchainAccount({...newValue?.value});
        setBalanceSelectedAccount((await Web3Service.node.eth.getBalance(newValue?.label as string)).toString());
    }

    async function changeInputs (e:ChangeEvent) {
        const inputElem=e.target as HTMLInputElement;
        setAmountToSend(parseInt(inputElem.value));
    }

    async function estimateGas () {
        const estimateGas=await Web3Service.node.eth.estimateGas({
            value:amountToSend,
            from:selectedBlockchainAccount?.address,
            to:selectedBlockchainAccount?.address
        });
        setEstimatedGas(estimateGas.toString());
    }

    function openAcceptModal () {
        Modal.getOrCreateInstance("#acceptDepositModal").show();
    }

    async function submitSendEth (privateKey:string) {
        const signedTransaction=await Web3Service.node.eth.accounts.signTransaction({
            from:selectedBlockchainAccount?.address,
            to: Web3Service.bankerAddress,
            value: amountToSend,
            gasPrice: await Web3Service.node.eth.getGasPrice()
        },privateKey);

        //console.log(signedTransaction);
        const depositDTO= new DepositFromBlockChainDTO;
        depositDTO.signedTransaction=signedTransaction;
        depositDTO.toAccountId=account?.id;

        await axiosFetchs.depositFromEthBlockChainAccount(depositDTO);


        hideModal();

        formElem.current?.reset();
        setSelectedBlockchainAccount(null);
    }

    async function submitSendBC (privateKey:string) {
        const method= await buildingsContract.transferTo(Web3Service.bankerAddress as string,amountToSend);
        const signedTransaction=await Web3Service.node.eth.accounts.signTransaction({
            from:selectedBlockchainAccount?.address,
            to: buildingsContract.contractBuildingsAddress,
            value: 0,
            data: method.encodeABI(),
            gasPrice: await Web3Service.node.eth.getGasPrice()
        },privateKey);

        //console.log(signedTransaction);
        const depositDTO= new DepositFromBlockChainDTO;
        depositDTO.signedTransaction=signedTransaction;
        depositDTO.toAccountId=account?.id;

        await axiosFetchs.depositFromBCBlockChainAccount(depositDTO);


        hideModal();

        formElem.current?.reset();
        setSelectedBlockchainAccount(null);
    }

    function hideModal () {
        formElem.current?.reset();
        setBalanceSelectedAccount(null);
        setSelectedBlockchainAccount(null);
        Modal.getOrCreateInstance("#depositModal").hide();
    }

    const blockChainAccountsSelect=blockchainAccounts?.map(x=>{
        return {value:x as BlockchainAccounts,label:x.address as string};
    })

    return (
        <div>
            <div className="modal fade" id="depositModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Transferencia</h1>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {balanceSelectedAccount ? <h5>{balanceSelectedAccount} Eth</h5> : <></>}
                            <form className="" ref={formElem}>
                                <Select options={blockChainAccountsSelect} onChange={onChangeSelect} value={selectedBlockchainAccount ? blockChainAccountsSelect?.find(x=>x.label==selectedBlockchainAccount?.address) : null}/>
                                <input className="form-control" type="text" name="amount" placeholder="Eth" onChange={changeInputs} disabled={selectedBlockchainAccount ? false : true } required />
                            </form>
                                {selectedBlockchainAccount ? <h6>Estimated Gas: {estimatedGas}</h6> : <></>}
                                <button className="btn btn-success" onClick={openAcceptModal} disabled={selectedBlockchainAccount && amountToSend>0 ? false : true}>Deposit Eth</button>
                                
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={openAcceptModal}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <AcceptDepositModal blockChainAccount={selectedBlockchainAccount as BlockchainAccounts} amountToSend={amountToSend} acceptDepositEth={(privateKey)=>{submitSendEth(privateKey)}} acceptDepositBC={(privateKey)=>{submitSendBC(privateKey)}}/>
        </div>
    );
}
