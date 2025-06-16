"use client"
import DataTable, { DataTableComponent, DataTableRef } from "datatables.net-react";
import DataTables from "datatables.net-responsive";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import { ListRequestDatatablesDTO } from "@/components/classes/dto/dataTables/listRequestDatatables.dto";
import { axiosFetchs } from "@/components/utils/axios";
import { Users } from "@/components/classes/entity/users.entity";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { Modal } from "bootstrap";
import UpdateUsersListAdmin from "./updateUsersListAdmin";
import UpdateUsersPasswordListAdmin from "./updateUserListPasswordAdmin";
import { ToastContainer } from "react-toastify";


DataTable.use(DT);
export default function UsersListAdmin () {
    const [userToUpdate,setUserToUpdate]=useState(null as Users|null);
    const dataTableRef= useRef(null as DataTableRef|null);

    const columns= [
        {data: "id", name:"id"},
        {data: "name", name: "name"},
        {data: "email", name: "email"},
        {data: "role", name: "role"},
        {name:"Accounts", data: null, defaultContent:""},
        {name:"Edit", data: null, defaultContent:""},
        {name:"Password", data: null, defaultContent:""}
    ];

    async function sendToAccounts (id:number) {
        window.location.href=(`/admin/accounts/list?id=${id}`);
    }

    async function updateUser (user:Users) {
        setUserToUpdate({...user});
        Modal.getOrCreateInstance("#updateUserAdminModal").show();
    }

    async function updateUserPassword (user:Users) {
        setUserToUpdate({...user});
         Modal.getOrCreateInstance("#updateUserPasswordAdminModal").show();
    }

    async function reloadTableOnSubmit () {
        dataTableRef.current?.dt()?.ajax.reload();
    }

    return (
        <div>
        <FrontStaticComponent title="Panel de Administrador - Usuarios" subtitle="Usuarios" jsx={<div></div>} />
        <DataTable
            ref={dataTableRef} 
            columns={columns}
            slots= {{
                4: (data:any,row:Users) => {
                    return <span onClick={()=>sendToAccounts(row.id as number)} className="bi bi-cash" style={{cursor:"pointer"}}></span>
                
                },
                5: (data:any,row:Users) => {
                    return <span onClick={()=>updateUser(row)} className="bi bi-pencil" style={{cursor:"pointer"}}></span>
                },
                6: (data:any,row:Users) => {
                    return <span className="bi bi-key-fill" onClick={()=>updateUserPassword(row)} style={{cursor:"pointer"}}></span>
                }
            }}
            options={{
                serverSide:true, 
                responsive: {
                    details: {
                        renderer: DataTables.Responsive.renderer.listHiddenNodes() as any
                    }
                },
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
                    {targets:[0,1,2,3], orderable:true, orderSequence:["asc","desc"]},
                    {targets: [4,5,6], orderable:false}
                ]
            }} 
                className="display table table-hover"
            >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>ACCOUNTS</th>
                    <th>EDIT</th>
                    <th>PASSWORD</th>
                </tr>
            </thead>
        </DataTable>

        <ToastContainer containerId="axios" />
        <UpdateUsersListAdmin user={userToUpdate as Users} onSubmit={reloadTableOnSubmit}/>
        <UpdateUsersPasswordListAdmin user={userToUpdate as Users} onSubmit={reloadTableOnSubmit} />
        </div>
    );
}