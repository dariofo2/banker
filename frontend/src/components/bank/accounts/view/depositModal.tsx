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
import { AutoNumericInput } from "react-autonumeric";
import { Transaction } from "web3";
import AutoNumeric from "autonumeric";

class Props {
    account?: Accounts
    blockchainAccounts?: BlockchainAccounts[]
    onSubmitModal = ()=>{}
}

export default function DepositModal(props: Props) {
    const formElem = useRef(null as HTMLFormElement | null);
    const account = props.account;

    //const [getBlockChainAccountDTO,setGetBlockChainAccountDTO]=useState(null as GetBlockchainAccountDTO|null);
    const [blockchainAccounts, setBlockchainAccounts] = useState(null as BlockchainAccounts[] | null);
    const [selectedBlockchainAccount, setSelectedBlockchainAccount] = useState(null as BlockchainAccounts | null);
    const [balanceSelectedAccount, setBalanceSelectedAccount] = useState(null as string | null);
    const [balanceBCselectedBlockchainAccount, setBalanceBCSelectedBlockchainAccount] = useState(null as string | null);

    const [transactionToSend, setTransactionToSend] = useState(null as Transaction | null);
    const [mode, setMode] = useState(0);

    const [depositFromBlockchainAccountDTO, setDepositFromBlockchainaccountDTO] = useState({ toAccountId: account?.id } as DepositFromBlockChainDTO);

    const [amountToSendNumber, setAmountToSendNumber] = useState(0);
    

    const [estimatedGas, setEstimatedGas] = useState("" as string);

    useEffect(() => {
        getBlockChainAccounts()
    }, [])

    async function getBlockChainAccounts() {
        const response = await axiosFetchs.listBlockChainAccounts();
        setBlockchainAccounts([...response]);
    }

    //function onChange
    async function onChangeSelect(newValue: SingleValue<{ value: BlockchainAccounts, label: string }>) {
        setSelectedBlockchainAccount({ ...newValue?.value });

        const balanceEthWei=(await Web3Service.node.eth.getBalance(newValue?.label as string)).toString();
        const balanceEth=Web3Service.node.utils.fromWei(balanceEthWei,"ether");
        setBalanceSelectedAccount(balanceEth);

        const balanceBC=(await buildingsContract.getBalanceBS(newValue?.label as string)).toString();
        const balanceBCFormated=(parseFloat(balanceBC)/100).toFixed(2);
        setBalanceBCSelectedBlockchainAccount(balanceBCFormated);
    }

    async function onChangeAmount(e: ChangeEvent) {
        const inputElem = e.target as HTMLInputElement;
        console.log(inputElem.value);

        const amountValueDecimal = parseFloat(AutoNumeric.unformat(inputElem.value, AutoNumeric.getPredefinedOptions().Spanish).toString());

        setAmountToSendNumber(amountValueDecimal);


    }
    /*
    async function changeInputs(e: ChangeEvent) {
        const inputElem = e.target as HTMLInputElement;
        setAmountToSend(parseInt(inputElem.value));
    }
        */


    async function estimateGas(transaction: Transaction) {
        const estimateGas = await Web3Service.node.eth.estimateGas(transaction);
        setEstimatedGas(estimateGas.toString());
    }

    async function submitSendEth() {
        const euroToEth = parseInt(process.env.NEXT_PUBLIC_EURO_TO_ETH as string);
        const ethToSend = amountToSendNumber / euroToEth;

        const ethConverted = Web3Service.node.utils.toWei(ethToSend.toString(), "ether");

        const transaction = {
            from: selectedBlockchainAccount?.address,
            to: Web3Service.bankerAddress,
            value: ethConverted,
            gasPrice: await Web3Service.node.eth.getGasPrice()
        };



        setMode(0);
        setTransactionToSend(transaction);
        estimateGas(transaction);
        openAcceptModal();
    }

    async function submitSendBC() {
        const method = await buildingsContract.transferTo(Web3Service.bankerAddress as string, amountToSendNumber * 100);
        const transaction = {
            from: selectedBlockchainAccount?.address,
            to: buildingsContract.contractBuildingsAddress,
            value: 0,
            data: method.encodeABI(),
            gasPrice: await Web3Service.node.eth.getGasPrice()
        };

        setMode(1);
        setTransactionToSend(transaction);
        estimateGas(transaction)
        openAcceptModal();
    }



    async function sendDepositTransaction(privateKey: string) {
        const signedTransaction = await Web3Service.node.eth.accounts.signTransaction(transactionToSend as Transaction, privateKey);

        const depositDTO = new DepositFromBlockChainDTO;
        depositDTO.signedTransaction = signedTransaction;
        depositDTO.toAccountId = account?.id;

        switch (mode) {
            case 0:
                await axiosFetchs.depositFromEthBlockChainAccount(depositDTO);
                break;
            case 1:
                await axiosFetchs.depositFromBCBlockChainAccount(depositDTO);
                break;
        }

        setSelectedBlockchainAccount(null);
        props.onSubmitModal();
        hideModal();
    }

    function openAcceptModal() {
        Modal.getOrCreateInstance("#acceptDepositModal").show();
    }

    async function hideModal() {
        formElem.current?.reset();
        setBalanceSelectedAccount(null);
        setBalanceBCSelectedBlockchainAccount(null);
        setSelectedBlockchainAccount(null);
        setAmountToSendNumber(0.00);

        Modal.getOrCreateInstance("#depositModal").hide();
    }

    const blockChainAccountsSelect = blockchainAccounts?.map(x => {
        return { value: x as BlockchainAccounts, label: x.address as string };
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
                            {balanceSelectedAccount ? <h5>Eth: {balanceSelectedAccount} </h5> : <></>}
                            {balanceBCselectedBlockchainAccount ? <h5>BC: {balanceBCselectedBlockchainAccount}</h5> : <></>}
                            <form ref={formElem}>
                                <Select options={blockChainAccountsSelect} onChange={onChangeSelect} value={selectedBlockchainAccount ? blockChainAccountsSelect?.find(x => x.label == selectedBlockchainAccount?.address) : null} />
                                <AutoNumericInput inputProps={{className:"form-control", required: true, name: "amount", defaultValue:"0,00", onChange: onChangeAmount }} autoNumericOptions={AutoNumeric.getPredefinedOptions().Spanish} />
                            </form>
                            <button className="btn btn-success" onClick={submitSendEth} disabled={selectedBlockchainAccount && amountToSendNumber > 0 ? false : true}>Deposit Eth</button>
                            <button className="btn btn-success" onClick={submitSendBC} disabled={selectedBlockchainAccount && amountToSendNumber > 0 ? false : true}>Deposit BC</button>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={openAcceptModal}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <AcceptDepositModal blockChainAccount={selectedBlockchainAccount as BlockchainAccounts} estimateGas={estimatedGas} amountToSend={amountToSendNumber} acceptDeposit={(privateKey) => { sendDepositTransaction(privateKey) }} />
        </div>
    );
}
