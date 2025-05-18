"use client"

import BootstrapClient from "@/components/bootstrapClient"
import { ScrollSpy, Toast } from "bootstrap";
import { useEffect, useRef } from "react";

export default function ManualStaticComponent() {
    const refToast = useRef({} as HTMLDivElement);
    useEffect(() => {
        const scrollSpy = new ScrollSpy(document.body, {
            target: "#listNavSpy",
            rootMargin:"0px 0px -40%"
        })
    }, [])
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="sticky-top" style={{ top: 80 }}>
                            <ul className="scrollSpy" id="listNavSpy">
                                <li className="nav-item">
                                    <a href="#introduccion" className="nav-link">Introducción</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#registrocuenta" className="nav-link">Registro de Cuenta</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#accedercuenta" className="nav-link">Acceder a Cuenta</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#miscuentas" className="nav-link">Mis Cuentas</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#usarcuenta" className="nav-link">Usar Cuenta</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#crearcuentanormal" className="nav-link">Crear Cuenta Normal</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#movimientos" className="nav-link">Movimientos</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#ingresar" className="nav-link">Ingresar</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#transferencia" className="nav-link">Transferencia</a>
                                    <div className="divSpyActive"></div>
                                </li>
                                <li className="nav-item">
                                    <a href="#crearcuentablockchain" className="nav-link">Añadir Cuenta Blockchain</a>
                                    <div className="divSpyActive"></div>
                                </li>

                                <li>Cuenta BlockChain</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-8">
                        <div data-bs-smooth-scroll="true">
                            <h2 id="introduccion">Introducción</h2>
                            <p>Holaa</p>
                            <h2 id="registrocuenta">Registro de Cuenta</h2>
                            <p>Holaaa</p>
                            <h2 id="accedercuenta">Acceder a Cuenta</h2>
                            <p>Holaaa</p>
                            <h2 id="miscuentas">Mis Cuentas</h2>
                            <p>HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA HOLAAA </p>
                            <h2 id="usarcuenta">Usar Cuenta</h2>
                            <p>Holaaa</p>
                            <h2 id="crearcuentanormal">Crear Cuenta Normal</h2>
                            <p>Holaaaa</p>
                            <h2 id="movimientos">Movimientos</h2>
                            <p>Holaaa</p>
                            <h2 id="ingresar">Ingresar</h2>
                            <h2 id="transferencia">Transferencia</h2>
                            <h2 id="crearcuentablockchain">Crear Cuenta BlockChain</h2>
                            <h1>HOLAAA</h1>
                            <h1>HOLAAA</h1>
                            <h1>HOLAAA</h1>
                            <h1>HOLAAA</h1>
                            <h1>HOLAAA</h1>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    );
}