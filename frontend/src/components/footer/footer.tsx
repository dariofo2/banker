export default function FooterComponent() {
    return (
        <footer className="bg-black p-5 montserrat">
            <div className="container text-white">
                <div className="row justify-content-evenly text-center text-lg-start g-4">
                    <div className="col-lg-2">
                        <div className="m-auto" style={{ width: "fit-content" }}>
                            <h5>Contacto</h5>
                            <ul className="list-unstyled">
                                <li>Ubicación</li>
                                <li>Teléfono</li>
                                <li>Email</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="m-auto" style={{ width: "fit-content" }}>
                            <h5>Página</h5>
                            <ul className="list-unstyled">
                                <li><a href="/">Home</a></li>
                                <li><a href="/statics/blockchain">BlockChain</a></li>
                                <li><a href="/statics/manual">Manual</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="m-auto" style={{ width: "fit-content" }}>
                            <h5>Legal</h5>
                            <ul className="list-unstyled">
                                <li><a href="/statics/legalAdvert">Aviso Legal</a></li>
                                <li><a href="/statics/cookiesPolicy">Política de Cookies</a></li>
                                <li><a href="/statics/privacityPolicy">Política de Privacidad</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="border-top border-1 border-white mt-4"></div>
                    <div className="row justify-content-between">
                        <div className="col-lg-3 text-center text-lg-start">
                            <p className="">2025 All rights Reserved</p>
                        </div>
                        <div className="col-lg-3 text-center">
                            <img className="img-fluid mt-3 mb-3" src="/BankerLogo.svg" />
                        </div>
                        <div className="col-lg-3">
                            <div className="d-flex justify-content-center justify-content-lg-end column-gap-3 fs-1">
                                <div>
                                    <i className="bi bi-instagram"></i>
                                </div>
                                <div>
                                    <i className="bi bi-facebook"></i>
                                </div>
                                <div>
                                    <i className="bi bi-twitter"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}