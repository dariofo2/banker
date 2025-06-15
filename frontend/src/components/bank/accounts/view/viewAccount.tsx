"use client"

import { axiosFetchs } from "@/components/utils/axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Cookies from "js-cookie";
import { Accounts } from "@/components/classes/entity/accounts.entity";
import { Movements } from "@/components/classes/entity/movements.entity";
import { ListRequestDTO } from "@/components/classes/dto/listRequestDTO";
import { ListMovementsDTO } from "@/components/classes/dto/movements/listMovements.dto";
import { ListResponseDTO } from "@/components/classes/dto/listResponseDTO";
import { ToastContainer } from "react-toastify";
import ViewAccountMovementCard from "./viewAccountMovementCard";
import CreateMovementModal from "./makeMovementModal";
import { Modal } from "bootstrap";
import ViewAccountUpdateModal from "./viewAccountUpdateModal";
import moment from "moment";
import DeleteMovementModal from "./deleteMovementModal";
import { DeleteMovementDTO } from "@/components/classes/dto/movements/deleteMovement.dto";
import DepositModal from "./depositModal";
import Loading from "@/components/loading/loading";
import FrontStaticComponent from "@/components/static/front/frontStatic";

export default function ViewAccount() {
    const [getAccountDTO, setGetAccountDTO] = useState({ id: parseInt(Cookies.get("accountId") as string) });
    const [account, setAccount] = useState(null as Accounts | null);

    const [listRequestMovementsDTO, setListRequestMovementsDTO] = useState(new ListRequestDTO<ListMovementsDTO>(new ListMovementsDTO(getAccountDTO.id, undefined, undefined), 1, 25));
    const [listResponseMovements, setListResponseMovements] = useState(null as ListResponseDTO<Movements[]> | null);

    const [movementsGroupedByDate, setMovementsGroupedByDate] = useState(null as Map<string, Movements[]> | null);

    const [movementToDelete, setMovementToDelete] = useState(null as Movements | null);



    useEffect(() => {
        getAccount();
        if (listRequestMovementsDTO.page == 1) {
            getAccount();
            getMovements();
        } else {
            addMovements();
        }
    }, [listRequestMovementsDTO]);




    async function getAccount() {
        const response = await axiosFetchs.getAccount(getAccountDTO);
        setAccount({ ...response });
    }
    async function getMovements() {
        const response = await axiosFetchs.listMovementsByAccount(listRequestMovementsDTO);

        setListResponseMovements({ ...response });
        refreshMovementsGroupByDate(response.data as Movements[]);
    }

    async function refreshMovementsGroupByDate(movements: Movements[]) {
        const movementsGroupedByDate = await groupMovementsByYearMonth(movements);
        console.log(Array.from(movementsGroupedByDate));
        setMovementsGroupedByDate(movementsGroupedByDate);
    }

    async function groupMovementsByYearMonth(movements: Movements[]) {
        console.log(movements)
        const groupMovementByDate: Map<string, Movements[]> = movements.reduce((movs: Map<string, Movements[]>, x: Movements) => {

            const movementYDM = moment.unix(x.date as number).format("DD - MMM - YY");
            console.log(movementYDM);
            if (movs.has(movementYDM)) {
                movs.get(movementYDM)?.push(x);
            } else {
                movs.set(movementYDM, [x]);
            }

            return movs;
        }, new Map<string, Movements[]>);
        console.log(groupMovementByDate);
        return groupMovementByDate;
    }

    async function addMovements() {
        const response = await axiosFetchs.listMovementsByAccount(listRequestMovementsDTO)

        const movementsTotal = (listResponseMovements?.data as Movements[]).concat(response.data as Movements[]);

        refreshMovementsGroupByDate(movementsTotal);
        setListResponseMovements(
            {
                ...response,
                data: movementsTotal
            }
        )
    }

    function changeDates(e: FormEvent) {
        const elem = e.target as HTMLInputElement;
        e.preventDefault();
        const dateStart = moment((document.getElementById("dateStart") as HTMLInputElement).value).format("X");
        const dateEnd = moment((document.getElementById("dateEnd") as HTMLInputElement).value).format("X");

        setListRequestMovementsDTO({
            ...listRequestMovementsDTO,
            data: {
                originAccount: listRequestMovementsDTO.data.originAccount,
                dateStart: parseInt(dateStart),
                dateEnd: parseInt(dateEnd)
            },
            page: 1
        })
    }

    function nextMovementsPage() {
        setListRequestMovementsDTO({
            ...listRequestMovementsDTO,
            page: listRequestMovementsDTO.page + 1
        });
    }

    function deleteMovement(movement: Movements) {
        setMovementToDelete({
            ...movement
        });
        Modal.getOrCreateInstance("#deleteModal").show();
    }

    async function confirmDelete() {
        const deleteDTO = new DeleteMovementDTO;
        deleteDTO.id = movementToDelete?.id;

        await axiosFetchs.deleteMovement(deleteDTO);

        const movementsNew = (listResponseMovements?.data?.filter(x => x.id != movementToDelete?.id)) as Movements[];

        setListResponseMovements({
            ...listResponseMovements,
            data: movementsNew
        });

        refreshMovementsGroupByDate(movementsNew);
    }

    function showCreateMovementModal() {
        Modal.getOrCreateInstance("#createMovementModal").show();
    }

    function showUpdateAccountModal() {
        setAccount({
            ...account
        });

        Modal.getOrCreateInstance("#updateAccountModal").show();
    }

    function showDepositModal() {
        Modal.getOrCreateInstance("#depositModal").show();
    }

    if (!account || !listResponseMovements) {
        return (<Loading />);
    }

    
    let money = parseFloat(account?.balance as any);

    const movementsMap = Array.from((movementsGroupedByDate as Map<string, Movements[]>).entries()).map(x => {
        let isFirstMovement=true;
        return (
            <div>
                <h6 className="text-center text-bg-info">{x[0]}</h6>
                {x[1].map((x) => {
                    const floatMoney= parseFloat(x.money as any);
                    
                    const moneyNew = money;
                    if (!isFirstMovement) {
                        if (x.type == "movement") {
                            if (x.originAccount==account.number) money += floatMoney
                            else money -= floatMoney
                        }
                        if (x.type == "deposit") money -= floatMoney
                        if (x.type == "depositToBlockchain") money -= floatMoney
                    } else {
                        isFirstMovement=false;
                    }
                    
                    money=parseFloat(money.toFixed(2));
                    //money = Math.round(money);
                    //console.log(Math.round(money))
                    return <ViewAccountMovementCard key={x.id} onClickDelete={(movement) => deleteMovement(movement)} account={account} movement={x} money={{ moneyOld: money, moneyNew: moneyNew }} />
                })}
            </div>
        )
    });

    return (
        <div>
            <FrontStaticComponent
                title={`Tu Cuenta ${account.type}`}
                jsx={<div>
                    <h4>Tienes <span className="fw-bold">{account.balance} €</span></h4>
                    <h5 className="fs-4">{account.number}</h5>
                    <div>

                        <button className="btn btn-lg btn-warning me-3" onClick={showUpdateAccountModal}>Editar Cuenta</button>
                        <button className="btn btn-lg btn-warning me-3" onClick={showDepositModal}>Ingresar</button>
                        <br />
                        <button className="btn btn-lg btn-warning mt-3" onClick={showCreateMovementModal}>Realizar Transferencia</button>
                    </div>
                </div>}
            />
            <div>
                <div>

                </div>

                <form onSubmit={changeDates}>
                    <input type="date" id="dateStart" name="startDate" placeholder="Fecha Inicial" required></input>
                    <input type="date" id="dateEnd" name="endDate" placeholder="Fecha Final" required></input>
                    <button className="btn btn-outline-light">Buscar</button>
                </form>
                {movementsMap}
                <button className="btn btn-success" onClick={nextMovementsPage}>Next Page</button>
            </div>
            <CreateMovementModal account={account} onSubmit={() => { setListRequestMovementsDTO({ ...listRequestMovementsDTO, page: 1 }) }} />
            <ViewAccountUpdateModal account={account} onSubmit={() => { getAccount() }} />
            <DeleteMovementModal message="¿Está seguro de que desea borrar la Transferencia?" onDeleteConfirm={() => confirmDelete()} />
            <DepositModal account={account} onSubmitModal={() => setListRequestMovementsDTO({ ...listRequestMovementsDTO, page: 1 })} />
            <ToastContainer containerId="axios" />
        </div>
    )
}