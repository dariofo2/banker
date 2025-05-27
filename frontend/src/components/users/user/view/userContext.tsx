import { UpdateUserDto } from "@/components/classes/dto/users/updateUser.dto";
import { UpdateUserPasswordDTO } from "@/components/classes/dto/users/updateUserPassword.dto";
import { Users } from "@/components/classes/entity/users.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { createContext, ReactNode, useState } from "react";

export const UpdateUserContext = createContext({user:{hola:"h"},updateUser:()=>{}});

interface DatosProviderProps {
    children: ReactNode
}
export default function UpdateUserProvider ({children}:DatosProviderProps) {
    const [user,setUser]=useState({hola:"hola"});
    const [updateUserPasswordDTO,setUpdatePasswordDTO]=useState(new UpdateUserPasswordDTO);
    const [updateUserDTO,setUpdateUserDTO]=useState(new UpdateUserDto);

    function updateUser () {
        setUser({hola:"holaa"});
        console.log("hola");
    }
    return (
        <UpdateUserContext.Provider value={{user,updateUser}}>
            {children}
        </UpdateUserContext.Provider>
    )
}