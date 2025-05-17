export default function HeroComponent () {
    return (
        <main className="montserrat">
            <div className="bg-primary position-relative" style={{ minHeight: "100vh", width: "100%" }}>
                <div className="position-absolute mb-5 p-5 bottom-0 start-0 end-0">
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
                <div className="align-content-center h-100" style={{minHeight:"100vh"}}>
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-6">
                                <div className="text-white">
                                    <h1 className="mb-4">Tu Banco Online Favorito</h1>
                                    <p className="fw-medium mb-4">Un banco que lo tiene todo, capacidades absolutas para trabajar con distintos clientes y cuentas, todo esto conectado con la red de Ethereum: La BlockChain</p>
                                    <button className="btn btn-warning">Hazte Cliente</button>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="bg-white p-4 pt-5 pb-5">
                                    <h4 className="mb-5">Iniciar Sesión</h4>
                                    <form>
                                        <div className="mb-4">
                                            <label className="form-label mb-2 fw-medium">E-Mail</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><i className="bi bi-envelope fs-5"></i></span>
                                                <input className="form-control" type="email" name="email" placeholder="E-Mail"></input>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label mb-2 fw-medium">Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><i className="bi bi-key fs-5"></i></span>
                                                <input className="form-control" type="password" name="password" placeholder="Password"></input>
                                            </div>
                                        </div>
                                        <button className="btn btn-dark w-100 mt-3">Log - In</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}