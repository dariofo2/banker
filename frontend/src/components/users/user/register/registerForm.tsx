"use client"

import { CreateUserDTO } from "@/components/classes/dto/users/createUser.dto";
import { Users } from "@/components/classes/entity/users.entity";
import { axiosFetchs } from "@/components/utils/axios";
import { CryptoUtils } from "@/components/utils/crypto";
import { AxiosError, AxiosResponse } from "axios";
import { Toast } from "bootstrap";
import { plainToClass } from "class-transformer";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function CreateUserForm() {
    const [user, setUser] = useState(new Users);

    function updateUser(e: ChangeEvent) {
        const elementInput = e.target as HTMLInputElement;

        setUser({
            ...user,
            [elementInput.name]: elementInput.value
        });
    }

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        formElement.classList.add("was-validated");
        
        if (formElement.checkValidity()) {
            const createUserDto = plainToClass(CreateUserDTO, user);
            createUserDto.password=await CryptoUtils.hashPasswordToSha256(createUserDto.password as string);
            
            const response = await axiosFetchs.createUser(createUserDto);

            if (response instanceof AxiosError) {
                const errorMessages = (response.response?.data as any).message as string[];

                errorMessages.forEach(x => {
                    toast['error'](x);
                });

            } else {
                toast['success']("Usuario Creado con Éxito")
            }
        }
    }

    function checkValidation() {

    }


    return (
        <div className="container-fluid">
            <div className="container">

                <div id="toastContainerIDS">
                    <ToastContainer position="top-center" />
                </div>
                <form className="mt-5 has-validation" noValidate onSubmit={(e) => submitForm(e)}>
                    <div className="form-floating">
                        <input id="name" name="name" className="form-control" type="text" placeholder="Nombre" onChange={(e) => updateUser(e)} 
                            pattern="^[A-Za-z]{2,}" required />
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <div className="invalid-feedback">Nombre Invalido</div>
                    </div>
                    <div className="form-floating">
                        <input id="email" name="email" className="form-control" type="email" placeholder="Email" onChange={(e) => updateUser(e)} required />
                        <label htmlFor="name" className="form-label">Email</label>
                        <div className="invalid-feedback">Email Invalido</div>
                    </div>
                    <div className="form-floating">
                        <input id="password" name="password" className="form-control" type="password" placeholder="Contraseña" onChange={(e) => updateUser(e)} required />
                        <label htmlFor="name" className="form-label">Contraseña</label>
                        <div className="invalid-feedback">Contraseña Invalida</div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" required></input>
                        <label className="form-check-label">Acepto las condiciones y las políticas de Privacidad y Cookies de Banker S.L</label>
                        <div className="invalid-feedback">Es necesario Marcar la casilla</div>
                    </div>
                    <button className="btn btn-success">Crear Usuario</button>
                </form>
            </div>
        </div>
    )
}