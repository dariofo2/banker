export default function WhyTrustComponent() {
    return (
        <div className="bg-black text-white montserrat p-5">
            <div className="container pt-5 pb-5">
                <div className="row align-items-center justify-content-evenly g-0">
                    <div className="col-4">
                        <div>
                            <h2 className="gradientTextPink" style={{ maxWidth: 360 }}>¿Por qué confiar en Banker?</h2>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row justify-content-evenly">
                            <div className="col-5">
                                <div>
                                    <h2><i className="text-pink-dark-lighter bi bi-triangle"></i></h2>
                                    <h5 className="text-pink-dark">Innovación</h5>
                                    <p>Nos dedicamos a la innovación</p>
                                </div>
                            </div>
                            <div className="col-5">
                                <div>
                                    <h2><i className="text-pink-dark-lighter bi bi-triangle"></i></h2>
                                    <h5 className="text-pink-dark">Seguridad</h5>
                                    <p>Un banco no es nada sin seguridad</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5 justify-content-evenly">
                            <div className="col-5">
                                <div>
                                    <h2><i className="text-pink-dark-lighter bi bi-triangle"></i></h2>
                                    <h5 className="text-pink-dark">Experiencia</h5>
                                    <p>La experiencia lo es todo en la vida</p>
                                </div>
                            </div>
                            <div className="col-5">
                                <div>
                                    <h2><i className="text-pink-dark-lighter bi bi-triangle"></i></h2>
                                    <h5 className="text-pink-dark">Atención al Cliente</h5>
                                    <p>Atención al cliente personalizada 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}