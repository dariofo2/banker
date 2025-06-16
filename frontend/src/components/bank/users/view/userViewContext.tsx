import { UpdateUserDto } from "@/components/classes/dto/users/updateUser.dto";
import { UpdateUserPasswordDTO } from "@/components/classes/dto/users/updateUserPassword.dto";
import { Users } from "@/components/classes/entity/users.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { createContext, ReactNode, useState } from "react";

/*
class ContextUser {
    user?:Users;
    updateUser?:Users;
    updatePassword?: Users;
    setUser=(user:Users)=>{};
    setUpdateUser= () => {};
    setUpdatePassword= () => {};
}
export const UpdateUserContext = createContext<ContextUser|undefined>(undefined);

export default function UpdateUserProvider () {
    const [user,setUser]=useState(undefined as Users|undefined);
    const [updateUserPasswordDTO,setUpdatePasswordDTO]=useState(undefined as UpdateUserPasswordDTO|undefined);
    const [updateUser,setUpdateUser]=useState(undefined as Users|undefined);

    function setUserFunc (user:Users) {
        setUser({...user});
    }

    function setUpdateUserFunc (user:Users) {
        setUpdateUser({...user})
    }
    function setUpdateUserPasswordFunc () {
        setUpdatePasswordDTO()
    }
    return (
        <UpdateUserContext.Provider value={{user:user,updateUser:updateUser,updatePassword:updateUserPasswordDTO,setUser:setUserFunc,}}>
            <{children}>
        </UpdateUserContext.Provider>
    )
}
    */