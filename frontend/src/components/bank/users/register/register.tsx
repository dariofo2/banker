"use client"
import { ToastContainer } from "react-toastify";
import CreateUserForm from "./registerForm";

export default function Register () {
    return (
        <div>
            <div className="container shadow bg-white p-5" style={{marginTop:-200}}>
                <CreateUserForm />
            </div>
            <ToastContainer containerId="axios" />
        </div>
    )
}