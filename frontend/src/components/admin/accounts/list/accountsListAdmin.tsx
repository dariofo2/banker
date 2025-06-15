"use client"
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import { ListRequestDatatablesDTO } from "@/components/classes/dto/dataTables/listRequestDatatables.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Users } from "@/components/classes/entity/users.entity";
import { redirect } from "next/navigation";

DataTable.use(DT);
export default function AccountsListAdmin () {
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
        {data: "name", name: "name"},
        {data: "email", name: "email"},
        {data: "role", name: "role"},
        {name:"Accounts", data: null, defaultContent:""}
    ];

    async function sendToAccounts (id:number) {
        await axiosFetchs.setAccountIdCookie(id);
        redirect("/admin/accounts/list");
    }
    
    return (
        <div>
        <FrontStaticComponent title="Panel de Administrador - Usuarios" subtitle="Usuarios" jsx={<div></div>} />
        <DataTable 
            columns={columns}
            slots= {{
                4: (data:any,row:Users) => {
                    return <button onClick={()=>sendToAccounts(row.id as number)}>Go</button>
                
                }
            }}
            options={{
                serverSide:true, 
                responsive:true,
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
                        data:{}
                        
                    }
                    console.log(listRequestDatatablesDTO)
                    const response= await axiosFetchs.adminListUsers(listRequestDatatablesDTO);
                    console.log(response);
                    callback(response);
                },
                select:true, 
                order:[[1,"asc"]], 
                ordering:true, 
                columnDefs: [
                    {targets:[1,2,3], orderable:true},
                    
                ]
            }} 
                className="display table table-hover"
            >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Accounts</th>
                </tr>
            </thead>
        </DataTable>
        </div>
    );
}