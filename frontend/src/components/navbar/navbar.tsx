"use client"
import Cookies from "js-cookie";
import { axiosFetchs } from "../utils/axios";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { Users } from "../classes/entity/users.entity";
class Props {
    user:Users={}
}
export default function NavBar(props: Props) {
    const user=props.user;

    useEffect(()=>{
        if (Cookies.get("user")) {
            axiosFetchs.getUser();
        }
    },[]);
    
    const {scrollYProgress} = useScroll();
    //const scrollSpring=useSpring(scrollYProgress);

    const colorsFade=useTransform(scrollYProgress,
        [0,0.01],
        ["rgba(0, 0, 0,0)","rgba(0, 0, 0, 1)"]
    )

    async function myAccounts () {
        window.location.href="/bank/accounts/list";
    }

    async function myProfile () {
        window.location.href="/bank/users/view"
    }

    async function logout () {
        await axiosFetchs.logout();
        window.location.href="/";
    }

    if (!user) return (
        <motion.div className="fixed-top w-100 montserrat" style={{backgroundColor:colorsFade}}>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand ms-5" href="/">
                        <div style={{width:200}}>
                            <img className="img-fluid" src="/BankerLogo.svg" />
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav me-5">
                            <li className="nav-item">
                                <a className="nav-link fw-medium text-white" aria-current="page" href="/statics/blockchain">BlockChain</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium text-white" href="/statics/manual">Manual</a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <a href="/"><button className="btn btn-primary">Log-In</button></a>
                            <a href="/bank/users/register"><button className="btn btn-warning" type="submit">Register</button></a>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.div>
    );

    //Normal User
    if (user.role==1 || user.role==0) return (
        <motion.div className="fixed-top w-100 montserrat" style={{backgroundColor:colorsFade}}>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <div style={{width:200}}>
                            <img className="img-fluid" src="/BankerLogo.svg" />
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/bank/accounts/list">Mis Cuentas</a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            {user.photo ? <img style={{width:50}} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.photo}`}></img> : ""} 
                            <h6>{user.name}</h6>
                            <button className="btn btn-primary" onClick={myProfile}>Mi perfil</button>
                            <button className="btn btn-warning" type="submit" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.div>
    );

    //Admin User
    if (user.role==2) return (
        <motion.div className="fixed-top w-100 montserrat" style={{backgroundColor:colorsFade}}>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <div style={{width:200}}>
                            <img className="img-fluid" src="/BankerLogo.svg" />
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Usuarios</a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            {user.photo ? <img style={{width:50}} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.photo}`}></img> : ""} 
                            <h6>{user.name}</h6>
                            <button className="btn btn-primary" onClick={myProfile}>Mi perfil</button>
                            <button className="btn btn-warning" type="submit" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.div>
    );

}