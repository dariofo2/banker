"use client"
import { UserLoginDTO } from "@/components/classes/dto/auth/loginUser.dto";
import { Users } from "@/components/classes/entity/users.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { CryptoUtils } from "@/components/utils/crypto";
import { AxiosError } from "axios";
import { plainToClass } from "class-transformer";
import { createHash } from "crypto";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const [user, setUser] = useState(new Users);

    function updateUser (e:ChangeEvent) {
        const inputElement=e.target as HTMLInputElement;
        setUser({
            ...user,
            [inputElement.name]: inputElement.value
        })
    }

    async function submitForm (e:FormEvent) {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        formElement.classList.add("was-validated");

        const userLoginDTO=plainToClass(UserLoginDTO,user);

        userLoginDTO.password=await CryptoUtils.hashPasswordToSha256(userLoginDTO.password as string);
        const response=await axiosFetchs.fetchLogin(userLoginDTO);
        window.location.href="/bank/accounts/list";
        /*
        if (response instanceof AxiosError) {
            const messageErrors=(response.response?.data as any).message as string[];
            messageErrors.forEach(x => {
                toast.error(x);
            });
            
        } else {
            toast.success("Usuario Loggeado con Éxito");
        }
            */
    }

    return (
        <form onSubmit={e=>submitForm(e)} noValidate>
            <div className="mt-5 mb-4">
                <label className="form-label mb-2 fw-medium">E-Mail</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope fs-5"></i></span>
                    <input className="form-control" type="email" name="email" placeholder="E-Mail" onChange={(e)=>updateUser(e)} required></input>
                </div>
            </div>
            <div className="mb-2">
                <label className="form-label mb-2 fw-medium">Password</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-key fs-5"></i></span>
                    <input className="form-control" type="password" name="password" placeholder="Password" onChange={(e)=>updateUser(e)} required></input>
                </div>
            </div>
            <button className="btn btn-dark w-100 mt-3">Log - In</button>
            <ToastContainer position="top-center" containerId="axios" />
        </form>
    );
}