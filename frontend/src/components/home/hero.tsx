import Login from "../users/user/login/login";

export default function HeroComponent () {
    return (
        <main className="montserrat">
            <div className="gradientPinkBlack position-relative" style={{ minHeight: "100vh", width: "100%" }}>
                
                <div className="align-content-center h-100" style={{minHeight:"100vh"}}>
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-6 col-lg-5 col-xl-6">
                                <div className="text-white text-center text-md-start">
                                    <h1 className="mb-4 mt-5 mt-md-0 pt-5 pt-md-0">Tu Banco Online Favorito</h1>
                                    <p className="fw-medium mb-4">Un banco que lo tiene todo, capacidades absolutas para trabajar con distintos clientes y cuentas, todo esto conectado con la red de Ethereum: La BlockChain</p>
                                    <button className="btn btn-danger px-5 py-3 fs-5 mb-5 mb-md-0">Hazte Cliente</button>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-5">
                                <div className="bg-white p-4 pt-5 pb-5 shadow-lg">
                                    <h4 className="">Iniciar Sesión</h4>
                                    <hr></hr>
                                    <Login />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="position-absolute d-none d-md-block mb-5 p-5 bottom-0 start-0 end-0">
                    <div className="d-flex justify-content-center column-gap-5">
                        <div>
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                        <div>
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                        <div>
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-block d-md-none mb-5 p-5 bottom-0 start-0 end-0">
                    <div className="d-flex flex-wrap justify-content-center column-gap-5 row-gap-5">
                        <div>
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                        <div>
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                        <div>
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <div style={{width:150}}>
                                <img className="img-fluid" src="/next.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}