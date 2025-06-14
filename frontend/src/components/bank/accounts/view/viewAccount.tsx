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

export default function ViewAccount () {
    const [getAccountDTO, setGetAccountDTO]=useState({id:parseInt(Cookies.get("accountId") as string)});
    const [account,setAccount]=useState(null as Accounts|null);

    const [listRequestMovementsDTO,setListRequestMovementsDTO]=useState(new ListRequestDTO<ListMovementsDTO> (new ListMovementsDTO(getAccountDTO.id,undefined,undefined),1,25));
    const [listResponseMovements,setListResponseMovements]=useState(null as ListResponseDTO<Movements[]>|null);
    
    const [movementsGroupedByDate,setMovementsGroupedByDate]=useState(null as Map<string,Movements[]>|null);
    
    const [movementToDelete,setMovementToDelete]=useState(null as Movements|null);



    useEffect(()=>{
        getAccount();
        if (listRequestMovementsDTO.page==1) {
            getAccount();
            getMovements();
        } else {
            addMovements();
        }
    },[listRequestMovementsDTO]);




    async function getAccount () {    
        const response=await axiosFetchs.getAccount(getAccountDTO);
        setAccount({...response});
    }
    async function getMovements () {
        const response=await axiosFetchs.listMovementsByAccount(listRequestMovementsDTO);
        
        setListResponseMovements({...response});
        refreshMovementsGroupByDate(response.data as Movements[]);
    }

    async function refreshMovementsGroupByDate (movements:Movements[]) {
        const movementsGroupedByDate = await groupMovementsByYearMonth(movements);
        console.log(Array.from(movementsGroupedByDate));
        setMovementsGroupedByDate(movementsGroupedByDate);
    }

    async function groupMovementsByYearMonth (movements:Movements[]) {
        console.log(movements)
        const groupMovementByDate:Map<string,Movements[]> = movements.reduce((movs:Map<string,Movements[]>,x:Movements)=>{
            
            const movementYDM=moment.unix(x.date as number).format("DD - MMM - YY");
            console.log(movementYDM);
            if (movs.has(movementYDM)) {
                movs.get(movementYDM)?.push(x);
            } else {
                movs.set(movementYDM,[x]);
            }
            
            return movs;
        }, new Map<string,Movements[]>);
        console.log(groupMovementByDate);
        return groupMovementByDate;
    }

    async function addMovements () {
        const response=await axiosFetchs.listMovementsByAccount(listRequestMovementsDTO)
        
        const movementsTotal= (listResponseMovements?.data as Movements[]).concat(response.data as Movements[]);
        
        refreshMovementsGroupByDate(movementsTotal);
        setListResponseMovements(
            {...response,
                data: movementsTotal
            }
        )
    }

    function changeDates (e:FormEvent) {
        const elem=e.target as HTMLInputElement;
        e.preventDefault();
        const dateStart=moment((document.getElementById("dateStart") as HTMLInputElement).value).format("X");
        const dateEnd=moment((document.getElementById("dateEnd") as HTMLInputElement).value).format("X");
        
        setListRequestMovementsDTO({
            ...listRequestMovementsDTO,
            data: {
                originAccount:listRequestMovementsDTO.data.originAccount,
                dateStart:parseInt(dateStart),
                dateEnd:parseInt(dateEnd)
            },
            page:1
        })
    }

    function nextMovementsPage () {
        setListRequestMovementsDTO({
            ...listRequestMovementsDTO,
            page:listRequestMovementsDTO.page+1
        });
    }

    function deleteMovement (movement:Movements) {
        setMovementToDelete({
            ...movement
        });
        Modal.getOrCreateInstance("#deleteModal").show();
    }

    async function confirmDelete () {
        const deleteDTO=new DeleteMovementDTO;
        deleteDTO.id=movementToDelete?.id;

        await axiosFetchs.deleteMovement(deleteDTO);

        const movementsNew= (listResponseMovements?.data?.filter(x=>x.id!=movementToDelete?.id)) as Movements[];
        
        setListResponseMovements({
            ...listResponseMovements,
            data: movementsNew
        });

        refreshMovementsGroupByDate(movementsNew);
    }

    function showCreateMovementModal () {
        Modal.getOrCreateInstance("#createMovementModal").show();
    }

    function showUpdateAccountModal () {
        setAccount({
            ...account
        });

        Modal.getOrCreateInstance("#updateAccountModal").show();
    }

    function showDepositModal () {
        Modal.getOrCreateInstance("#depositModal").show();
    }

    if (!account || !listResponseMovements) {
        return (<Loading />);
    }
    listResponseMovements

    let money= account.balance as number;

    const movementsMap=Array.from((movementsGroupedByDate as Map<string,Movements[]>).entries()).map(x=>{
        
        return (
        <div>
            <h6 className="text-bg-info">{x[0]}</h6>
            {x[1].map((x)=>{
                const moneyNew=money;
                if (x.type=="movement") money +=x.money as number;
                if (x.type=="deposit") money -= x.money as number;
                if (x.type=="depositToBlockchain") money-= x.money as number;
                return <ViewAccountMovementCard key={x.id} onClickDelete={(movement)=>deleteMovement(movement)} account={account} movement={x} money={{moneyOld: money, moneyNew:moneyNew }} />
            })}
        </div>
        )
    });

    return (
        <div>
            <div>
                <div>
                    <h3>Cuenta Numero: {account.number}</h3>
                    <h5>Balance: {account.balance}</h5>
                    <h6>Tipo: {account.type}</h6>
                    <button className="btn btn-warning" onClick={showUpdateAccountModal}>Editar Cuenta</button>
                    <button className="btn btn-success" onClick={showDepositModal}>Ingresar</button>
                    <button className="btn btn-primary" onClick={showCreateMovementModal}>Realizar Transferencia</button>
                </div>
                
                <form onSubmit={changeDates}>
                    <input type="date" id="dateStart" name="startDate" placeholder="Fecha Inicial" required></input>
                    <input type="date" id="dateEnd" name="endDate" placeholder="Fecha Final" required></input>
                    <button className="btn btn-outline-light">Buscar</button>
                </form>
                {movementsMap}
                <button className="btn btn-success" onClick={nextMovementsPage}>Next Page</button>
            </div>
            <CreateMovementModal account={account} onSubmit={()=>{setListRequestMovementsDTO({...listRequestMovementsDTO,page:1})}}/>
            <ViewAccountUpdateModal account={account} onSubmit={()=>{getAccount()}} />
            <DeleteMovementModal message="¿Está seguro de que desea borrar la Transferencia?" onDeleteConfirm={()=>confirmDelete()} />
            <DepositModal account={account} onSubmitModal={()=>setListRequestMovementsDTO({...listRequestMovementsDTO,page:1})} />
            <ToastContainer containerId="axios" />
        </div>
    )
}