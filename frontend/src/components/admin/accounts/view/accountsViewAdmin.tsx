"use client"
import DataTable, { DataTableRef } from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import Responsive from "datatables.net-responsive";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import { ListRequestDatatablesDTO } from "@/components/classes/dto/dataTables/listRequestDatatables.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Users } from "@/components/classes/entity/users.entity";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/loading/loading";
import moment from "moment";
import { Movements } from "@/components/classes/entity/movements.entity";
import { Modal } from "bootstrap";
import { plainToClass } from "class-transformer";
import { DeleteMovementDTO } from "@/components/classes/dto/movements/deleteMovement.dto";
import ConfirmMovementsDeleteListAdmin from "./confirmAccountsViewAdmin";

DataTable.use(DT);
export default function AccountsViewAdmin () {
    const [searchParams, setSearchParams]=useState(useSearchParams());
    const [accountId,setAccountId]=useState(searchParams.get("id"));

    const [movementSelected, setMovementSelected]=useState(null as Movements|null);
    const datatableRef= useRef(null as DataTableRef|null);

    const columns= [
        {data: "id", name:"movements.id"},
        {data: "originAccount.number", name: "accounts_oa.number"},
        {data: "destinationAccount.number", name: "accounts_da.number"},
        //{data: "originAccount.user.name", name: "users_ou_name"},
        {data: "concept", name: "concept"},
        {data: "type", name: "movements.type"},
        {data: "money", name: "money"},
        {data: "date", name: "date", render: (data:any,type:any,row:any)=>{
            return moment.unix(data).format("DD/MM/Y");
        }},
        {name:"Delete", data: null, defaultContent:""}
    ];

    async function deleteMovement (movement:Movements) {
        setMovementSelected(movement);
        showConfirmDeleteMovementModal();
    }

    async function showConfirmDeleteMovementModal () {
        Modal.getOrCreateInstance("#confirmMovementDeleteAdminModal").show();
    }

    async function onSubmitDelete () {
        const deleteMovementDTO=plainToClass(DeleteMovementDTO,movementSelected);
        await axiosFetchs.adminDeleteMovement(deleteMovementDTO);
        reloadDatatable();
    }

    async function reloadDatatable () {
        datatableRef.current?.dt()?.ajax.reload();
    }
    
    if (!accountId) return (<Loading />)

    return (
        <div>
        <FrontStaticComponent title="Panel de Administrador - Movimientos" subtitle="Movimientos" jsx={<div></div>} />
        <DataTable 
            ref={datatableRef}
            columns={columns}
            slots= {{
                7: (data:any,row:Movements) => {
                    if (row.type=="movement") return <span className="bi bi-trash text-danger" onClick={()=>deleteMovement(row)}></span>
                    else return <> - </>;
                }
            }}
                
            options={{
                serverSide:true, 
                responsive: {
                    details: {
                        renderer: Responsive.Responsive.renderer.listHiddenNodes() as any
                    }
                },
                paging:true,
                ajax: async function (data, callback, settings) {
                    const dataProcess=data as any;
                    const listRequestDatatablesDTO: ListRequestDatatablesDTO = {
                        orderName:dataProcess.order[0].name,
                        orderDirection:(dataProcess.order[0].dir as string).toUpperCase(),
                        searchValue:`%${dataProcess.search.value}%`,
                        limit:dataProcess.length,
                        offset:dataProcess.start,
                        draw: dataProcess.draw,
                        data:{id:accountId}
                        
                    }
                    console.log(listRequestDatatablesDTO)
                    const response= await axiosFetchs.adminListMovements(listRequestDatatablesDTO);
                    console.log(response);
                    callback(response);
                },
                select:true, 
                order:[[1,"asc"]], 
                ordering:true, 
                columnDefs: [
                    {targets:[0,1,2,3,4,5,6], orderable:true, orderSequence:["asc","desc"]},
                    {targets: [7], orderable:false}
                ]
            }} 
                className="display table table-hover"
            >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>ORIGIN NUMBER</th>
                    <th>DESTINATION NUMBER</th>
                    <th>CONCEPT</th>
                    <th>TYPE</th>
                    <th>MONEY</th>
                    <th>DATE</th>
                    <th>DELETE</th>
                </tr>
            </thead>
        </DataTable>
        <ConfirmMovementsDeleteListAdmin movement={movementSelected as Movements} onSubmit={onSubmitDelete}/>
        </div>
    );
}