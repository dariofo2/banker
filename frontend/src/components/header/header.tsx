"use client"
import Cookies from "js-cookie";
import { axiosFetchs } from "../axios";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const axios = new axiosFetchs();
export default function HeaderComponent(props: any) {
    const {scrollYProgress} = useScroll();
    //const scrollSpring=useSpring(scrollYProgress);

    const colorsFade=useTransform(scrollYProgress,
        [0,0.01],
        ["rgba(0, 0, 0,0)","rgba(0, 0, 0, 1)"]
    )
    
    /*
//When second parameter is [] it runs only on Mount Creation of Component 1 time
//If I want to use it on unmount Use Return, which is called in return is what execute on end of component
//If i want to reload it on change of variables or props, add to second parameter [var1,var2]
    /*
useEffect(()=>{
},[])
*/
    /*
     async function logout () {
         await axios.logoutRemoveCookies();
         location.href="http://localhost:5000/main";
     }
     if (props.isLogged) {
         return (
             <div>
                 {props.username}
                 <button onClick={()=>{logout()}}>Logout</button>
             </div>
         );
     } else {
         return (
             <div>
                 <a href="../auth/login">Login</a> | <a href="../auth/login">Register</a> | <a href="../auth/login">Menu</a>
             </div>
         )
     }
     */

    return (
        <motion.div className="fixed-top w-100 montserrat" style={{backgroundColor:colorsFade}}>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand ms-5" href="#">
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
                                <a className="nav-link fw-medium text-white" aria-current="page" href="#">BlockChain</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-medium text-white" href="#">Manual</a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <button className="btn btn-primary">Log-In</button>
                            <button className="btn btn-warning" type="submit">Register</button>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.div>
    );

    return (
        <motion.div className="fixed-top w-100 montserrat" style={{backgroundColor:colorsFade}}>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
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
                                <a className="nav-link" aria-current="page" href="#">Mis Cuentas</a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <button className="btn btn-primary">NombreUsuario</button>
                            <button className="btn btn-warning" type="submit">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.div>
    );

}