"use client"
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import FrontStaticComponent from "@/components/static/front/frontStatic";
import { ListRequestDatatablesDTO } from "@/components/classes/dto/dataTables/listRequestDatatables.dto";

DataTable.use(DT);
export default function UsersListAdmin () {
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
        {data: "role", name: "role"}
    ];

    console.log("holaaa")
    return (
        <div>
        <FrontStaticComponent title="Panel de Administrador - Usuarios" subtitle="Usuarios" jsx={<div></div>} />
        <DataTable 
            columns={columns} 
            data={data} 
            options={{
                serverSide:true, 
                responsive:true,
                ajax(data, callback, settings) {
                    const dataProcess=data as any;
                    const listRequestDatatablesDTO: ListRequestDatatablesDTO = {
                        orderName:dataProcess.order[0].name,
                        orderDirection:dataProcess.order[0].dir,
                        searchValue:dataProcess.search.value,
                        page:dataProcess.start,
                        offset:dataProcess.length
                    }
                    
                    console.log(listRequestDatatablesDTO)
                },
                select:true, 
                order:[[1,"asc"]], 
                ordering:true, 
                columnDefs: [{targets:[1,2,3], orderable:true}]}} 
                className="display table table-hover"
            >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
        </DataTable>
        </div>
    );
}