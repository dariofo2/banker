"use client"
import DataTable from "datatables.net-react";
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
import { useEffect, useState } from "react";
import Loading from "@/components/loading/loading";
import { Accounts } from "@/components/classes/entity/accounts.entity";

DataTable.use(DT);
export default function AccountsListAdmin () {
    const [searchParams,setSearchParams]=useState(useSearchParams())
    const [userId,setUserId]=useState(searchParams.get("id"));

    useEffect(()=>{
    })
        
    const data=[{
        id: "1",
        name: "hola",
        email: "quetaal",
        role: "1"
    },
    {
        id: "2",
        name: "buenas",
        email: "quetaal",
        role: "1"
    },
    {
        id: "3",
        name: "tio",
        email: "quetaal",
        role: "1"
    }]
    const columns= [
        {data: "id", name:"id"},
        {data: "number", name: "number"},
        {data: "type", name: "type"},
        {data: "balance", name: "balance"},
        {name:"account", data: null, defaultContent:""},
        {name:"block",data:null, defaultContent:""}
    ];

    async function sendToAccount (id:number) {
        window.location.href=`/admin/accounts/view?id=${id}`;
    }
    
    async function blockAccount (id:number) {

    }
    
    if (!userId) return (<Loading />)
    
    return (
        <div>
        <FrontStaticComponent title="Panel de Administrador - Cuentas" subtitle="Cuentas" jsx={<div></div>} />
        <DataTable 
            columns={columns}
            slots= {{
                4: (data:any,row:Accounts) => {
                    return <button className="btn btn-primary" onClick={()=>sendToAccount(row.id as number)}>Go</button>
                },
                5: (data:any,row:Accounts) => {
                    return <button className="btn btn-danger" onClick={()=>blockAccount(row.id as number)}>Block</button>
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
                        data:{id: userId}
                        
                    }
                    console.log(listRequestDatatablesDTO)
                    const response= await axiosFetchs.adminListAccounts(listRequestDatatablesDTO);
                    console.log(response);
                    callback(response);
                },
                select:true, 
                order:[[1,"asc"]], 
                ordering:true, 
                columnDefs: [
                    {targets:[0,1,2,3], orderable:true, orderSequence:["asc","desc"]},
                    {targets: [4,5], orderable:false}
                ],
            }} 
                className="display table table-hover"
            >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NUMBER</th>
                    <th>TYPE</th>
                    <th>BALANCE</th>
                    <th>MOVEMENTS</th>
                    <th>BLOCK</th>
                </tr>
            </thead>
        </DataTable>
        </div>
    );
}