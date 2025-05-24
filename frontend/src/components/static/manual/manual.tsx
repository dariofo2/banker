"use client"

import BootstrapClient from "@/components/bootstrapClient"
import { ScrollSpy, Toast } from "bootstrap";
import { useEffect, useRef } from "react";

export default function ManualStaticComponent() {
    const refToast = useRef({} as HTMLDivElement);
    useEffect(() => {
        const scrollSpy = new ScrollSpy(document.body, {
            target: "#listNavSpy",
            rootMargin: "0px 0px -80%"
        })
    }, [])
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="sticky-top" style={{ top: 80 }}>

                            <nav className="nav nav-pills d-flex flex-column scrollSpy" id="listNavSpy">
                                <a href="#scroll1" className="nav-link">1. Introducción</a>
                                <div className="divSpyActive"></div>

                                <a href="#scroll2" className="nav-link">2. Cuentas de Usuario</a>
                                <div className="divSpyActive"></div>
                                <nav className="nav nav-pills ms-4 d-flex flex-column">
                                    <a href="#scroll21" className="nav-link">2.1 Registro de Cuenta</a>
                                    <div className="divSpyActive"></div>
                                    <a href="#scroll22" className="nav-link">2.2 Acceder</a>
                                    <div className="divSpyActive"></div>
                                    <a href="#scroll23" className="nav-link">2.3 Actualizar</a>
                                    <div className="divSpyActive"></div>
                                </nav>

                                <a href="#scroll3" className="nav-link">3. Cuentas de Banco</a>
                                <div className="divSpyActive"></div>
                                <nav className="nav ms-4 d-flex flex-column">
                                    <a href="#scroll31" className="nav-link">3.1 Crear Cuenta</a>
                                    <div className="divSpyActive"></div>
                                    <a href="#scroll32" className="nav-link">3.2 Borrar Cuenta</a>
                                    <div className="divSpyActive"></div>
                                    <a href="#scroll33" className="nav-link">3.3 Actualizar Cuenta</a>
                                    <div className="divSpyActive"></div>
                                    <a href="#scroll34" className="nav-link">3.4 Ver Cuenta</a>
                                    <div className="divSpyActive"></div>
                                    <nav className="nav ms-4 d-flex flex-column">
                                        <a href="#scroll341" className="nav-link">3.4.1 Movimientos</a>
                                        <div className="divSpyActive"></div>
                                        <a href="#scroll342" className="nav-link">3.4.2 Realizar Transferencia</a>
                                        <div className="divSpyActive"></div>
                                        <a href="#scroll343" className="nav-link">3.4.3 Ingresar Dinero</a>
                                        <div className="divSpyActive"></div>
                                    </nav>
                                </nav>

                                <a href="#scroll4" className="nav-link">4. Cuentas de BlockChain</a>
                                <div className="divSpyActive"></div>
                                <nav className="nav ms-4 d-flex flex-column">
                                    <a href="#scroll41" className="nav-link">4.1 Añadir Cuenta</a>
                                    <div className="divSpyActive"></div>
                                    <a href="#scroll42" className="nav-link">4.2 Transferencia</a>
                                    <div className="divSpyActive"></div>
                                    <a href="#scroll43" className="nav-link">4.3 BlockChain Buildings</a>
                                    <div className="divSpyActive"></div>
                                </nav>

                                <a href="#scroll5" className="nav-link">5. API de Pagos</a>
                                <div className="divSpyActive"></div>
                            </nav>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="scrollId" data-bs-smooth-scroll="true">
                            {/* Introducción */}
                            <h2 id="scroll1" style={{ scrollMarginTop: 80 }}>1. Introducción</h2>
                            <p>
                                Esto es Banker, un banco dedicado para ti, con muchas capacidades especiales, ya que es un banco
                                que conecta Banco y BlockChain a la vez.
                            </p>
                            <p>
                                En esta sección aprenderás todo sobre su uso.
                            </p>
                            <p>
                                Todas las preguntas que tienes acerca de su funcionamiento vienen explicadas en esta página,
                                desde como crear un usuario a crear cuentas Normales, añadir cuentas de BlockChain y el funcionamiento
                                de cada una de las páginas bien explicado
                            </p>
                            {/** 2. Usuario */}
                            <h2 id="scroll2">2. Cuenta de Usuario</h2>
                            <p>
                                Una cuenta de usuario lo es todo en Banker, es lo que te permite empezar a crear tus cuentas, añadir las de BlockChain y
                                empezar a trabajar con nosotros, sacando provecho de todos nuestros beneficios.
                            </p>
                            <h2 id="scroll21">2.1 Registro de cuenta de Usuario</h2>
                            <p>
                                Para registrar un usuario nuevo debes ir a la página http://www.banker.es/register y ahí debes proceder al proceso
                                de registro.
                            </p>
                            <p>
                                Es bastante sencillo, se necesitan pocos datos de ti como cliente y recuerda que no enviamos datos a terceros, tal
                                y como se explica en nuestro aviso legal
                            </p>
                            <p>
                                <strong>Nombre:</strong> Necesitamos tu nombre para saber a quien dirigirnos
                            </p>
                            <p>
                                <strong>Email:</strong> Es lo que usarás para el Login y para recibir comunicados, debe ser un Email de verdad y debe ser tuyo
                            </p>
                            <p>
                                <strong>Contraseña:</strong> Es lo que usaras para acceder a tu cuenta, no se la transfieras nadie! Es solo para ti. Si la pierdes
                                o se la das a alguien, pondrás en riesgo tu seguridad. Es como la llave de tu casa, o en este caso, de tu dinero.
                            </p>
                            <h2 id="scroll22">2.2 Acceder a tu cuenta de Usuario</h2>
                            <p>
                                Esto se hace directamente desde la página principal, en el menu de Login, http://www.banker.es
                            </p>
                            <p>
                                Debes introducir tu nombre y contraseña para acceder
                            </p>
                            <h2 id="scroll23">2.3 Actualizar Cuenta de Usuario</h2>
                            <p>
                                Desde la barra de navegacion superior puedes hacer click en tu nombre y ahí saldran varias opciones para poder actualizar tu cuenta
                                como cambiar la contraseña, el email o el nombre.
                            </p>
                            <h2 id="scroll3">3.Cuentas de Banco</h2>
                            <p>
                                Las cuentas de banco son como las de cualquier banco conocido, que habrás usado alguna vez en tu vida.
                            </p>
                            <p>
                                En una cuenta de banco puedes almacenar dinero, hacer transferencias, recibir pagos, ingresar dinero desde la BlockChain... y mucho más
                            </p>

                            <h2 id="scroll31">3.1 Crear una Cuenta</h2>
                            <p>
                                Para poder empezar a usar una cuenta e ingresar dinero en ella o recibir transferencias, lo primero que
                                necesitas es crear una.
                            </p>
                            <p>
                                Esto se hace pinchando en el acceso de la barra superior de navegacion el apartado "Mis Cuentas", desde ahí
                                tan solo hay que pinchar en "Crear una Cuenta Normal" y escoger el tipo de cuenta.
                            </p>
                            <p>
                                Recuerda que el número de cuenta se asigna automáticamente por el sistema de Banker, este numero de cuenta es único y es al que
                                se deben hacer las transferencias.
                            </p>
                            <h2 id="scroll32">3.2 Borrar una Cuenta</h2>
                            <p>
                                Se pueden borrar cuentas desde el menu de cuentas, pero el dinero no puede desaparecer, por lo tanto necesitas dejar tu cuenta
                                a 0.00 € para poder borrarla, así que si estás pensando en borrar una cuenta, primero quita el dinero de ella.
                            </p>
                            <h2 id="scroll33">3.3 Actualizar una Cuenta</h2>
                            <p>
                                Puedes modificar una cuenta modificando el tipo de cuenta, conforme para tener organizadas tus cuentas y saber cual es la de ahorro,
                                o credito o normal.
                            </p>
                            <h2 id="scroll34">3.4 Ver una cuenta</h2>
                            <p>
                                Al hacer click en una cuenta podrás ver la cuenta, para poder acceder a sus movimientos.
                            </p>
                            <h2 id="scroll341">3.4.1 Movimientos de Cuenta</h2>
                            <p>Al acceder a una cuenta, podremos ver los movimientos de esta cuenta, tanto los realizados como los que faltan por realizar</p>
                            <p>A parte de esto, podremos borrar movimientos (Siempre y cuando no quede ninguna de las cuentas implicadas por debajo de 0)</p>
                            <h2 id="scroll342">3.4.2 Realizar Movimientos</h2>
                            <p>Para realizar un movimiento, debemos poner la cifra que queremos mover y el numero de cuenta destinatario.</p>
                            <p>Al hacerlo y darle a enviar, nos saldrá un aviso y vualá, se habrá movido el dinero a otra cuenta</p>
                            <p><strong>Nota: </strong>Las cuentas nunca pueden quedar por debajo de 0</p>
                            <h2 id="scroll343">3.4.3 Ingresar Dinero en Cuenta</h2>
                            <p>Al ingresar dinero, tenemos diferentes formas, aunque la disponible por ahora es pasar el dinero desde una cuenta BlockChain</p>
                            <p>Para ello tienes que autorizar un traspaso de Ethereum de una cuenta BlockChain tuya a la tuya y vualá, aparecerá el dinero en tu cuenta</p>


                            <h2 id="scroll4">4. Cuenta de BlockChain</h2>
                            <p>
                                Banker permite interactuar con cuentas de BlockChain para realizar todo tipo de acciones, como transferencias o farm de BC
                            </p>
                            <p>
                                Para acceder a una cuenta de BlockChain, se accede también desde el menú "Mis Cuentas", ahí aparecen y puedes entrar en la que quieras.
                            </p>
                            <p>
                                Desde aquí podremos ver varias cosas sobre nuestra cuenta, como el historial de transferencias, realizar transferencias, gráficas, BlockChain Buildings etc.
                            </p>

                            <h2 id="scroll41">4.1 Añadir Cuenta de BlockChain</h2>
                            <p>
                                Para añadir una cuenta de BlockChain tenemos que poner su dirección de cuenta (Normalmente son del estilo 0x12345)
                            </p>
                            <p>
                                Despues debemos añadir la Key Privada, que es la que usaremos para firmar las transacciones.
                            </p>
                            <p>
                                <strong>Nota: </strong>Esta Key privada no se transfiere por ningún lado. Utiliza autenticación de doble contraseña y nunca viaja por la red ni a nuestros servidores,
                                por su seguridad, la encriptación y desencriptación para firmar se realiza solo en tu ordenador.
                            </p>
                            <h2 id="scroll42">4.2 Transferencia BlockChain</h2>
                            <p>
                                Para realizar una transferencia debes indicar la cuenta a la que quieres transferir y a partir de ahí firmar la transacción usando las dos contraseñas.
                            </p>

                            <h2 id="scroll43">4.3 BlockChain Buildings</h2>
                            <p>BlobkChain Buildings o BC, es nuestra criptomoneda, creada por nosotros.</p>
                            <p>Se farmea mediante edificios, que cuestan 1 Eth cada uno para construirlos y luego se obtienen BCs al alquilarlos por tiempo</p>
                            <p>Los edificios pueden subirse de nivel y luego pueden ser vendidos al precio que quieras, el que quiera lo comprará y se lo llevará</p>
                            <p>Recuerda que es tu edificio y desde Banker te recomendamos ponerle un nombre chulo</p>


                            {/* 5. API de PAGOS */}
                            <h2 id="scroll5">5. API De Pagos</h2>
                            <p>La API de Pagos es una funcionalidad exclusiva de Banker</p>
                            <p>Permite que puedas habilitar aceptar pagos desde tú pagina a través de Banker</p>
                            <p>Increíble no? Empieza a usar Banker y prueba nuestras ventajas</p>
                            <p>Para ello, lo unico que tienes que hacer es usar una librería de sencillo uso habilitada por nosotros</p>
                            <h2>5.1 Como utilizarla</h2>
                            <p>
                                Para usar nuestra Api de Pagos, simplemente tienes que usar la Libreria BankerApi, disponible en nuestro Github, la descargas y
                                puedes usarla en cualquier proyecto, importándola desde JavaScript o Typescript, y tan solo usando un método para
                                mandar al usuario a la página de banker cobros, se te dará un código único y cuando el usuario haya hecho la transacción
                                se te mandará el codigo para revisarla y comprobar que es verdad, recibirás tu dinero en tu Cuenta de Banker y le darás al cliente
                                lo que le hayas prometido
                            </p>
                            <h1>HOLAAA</h1>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}