"use client"

import { axiosFetchs } from "@/components/utils/axios";
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { Accounts } from "@/components/classes/entity/accounts.entity";
import { Movements } from "@/components/classes/entity/movements.entity";
import { ListRequestDTO } from "@/components/classes/dto/listRequestDTO";
import { ListMovementsDTO } from "@/components/classes/dto/movements/listMovements.dto";
import { ListResponseDTO } from "@/components/classes/dto/listResponseDTO";
import { ToastContainer } from "react-toastify";

export default function ViewAccount () {
    const [getAccountDTO, setGetAccountDTO]=useState({id:parseInt(Cookies.get("account") as string)});
    const [account,setAccount]=useState(null as Accounts|null);
    const [movements,setMovements]=useState(null as Movements[]|null);

    const [listRequestMovementsDTO,setListRequestMovementsDTO]=useState(new ListRequestDTO<ListMovementsDTO>(new ListMovementsDTO(getAccountDTO.id,undefined,undefined),1,25) as ListRequestDTO<ListMovementsDTO>);
    const [listResponseMovements,setListResponseMovements]=useState(null as ListResponseDTO<Movements>|null);

    useEffect(()=>{
        getAccount();
        getMovements();
    })

    async function getAccount () {    
        const response=await axiosFetchs.getAccount(getAccountDTO);
    }
    async function getMovements () {
        const response=await axiosFetchs.listMovementsByAccount(listRequestMovementsDTO)
    }
    if (!account || !movements) {
        return (
            <div style={{margin:300}}>
                Loading...
            </div>
        )
    }
    return (
        <div>
            <div>
                <h5>Filtrar Movimientos Por Fecha</h5>
                <input type="date" placeholder="Fecha Inicial"></input>
                <input type="date" placeholder="Fecha Final"></input>
                
            </div>
            <ToastContainer containerId="axios" />
        </div>
    )
}