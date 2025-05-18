export default function YourNewBankComponent() {
    return (
        <div>
            <div className="container p-3 pb-5 montserrat">
                <h2 className="m-auto text-center mt-5 mb-4 text-purple-dark" style={{ maxWidth: 200 }}>Tu Nuevo Banco</h2>
                <div className="row pt-5 g-3 g-lg-5 align-items-center">
                    <div className="col-lg-6 order-1 order-lg-0">
                        <div>
                            <h3 className="text-purple-dark mb-0">Nuestra Visión</h3>
                            <h5 className="text-purple-dark-lighter ms-4 mt-0 mb-4">Y esperamos que la tuya</h5>
                            <p>Creemos en una banca digital moderna, transparente y accesible. Por eso, combinamos lo mejor de la tecnología blockchain con la fiabilidad de las cuentas bancarias online tradicionales. Queremos que cada usuario tenga el poder de elegir cómo gestionar sus finanzas, siempre con seguridad, eficiencia y control total sobre sus activos.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 order-0 order-lg-1">
                        <div className="ratio ratio-16x9">
                            <img className="img-fluid object-fit-cover" src="/bank.jpg"></img>
                        </div>
                    </div>
                    <div className="col-lg-6 order-2 order-lg-2">
                        <div className="ratio ratio-16x9">
                            <img className="img-fluid object-fit-cover" src="/bank.jpg"></img>
                        </div>
                    </div>
                    <div className="col-lg-6 order-3 order-lg-3">
                        <div>
                            <h3 className="text-purple-dark mb-0">Quiénes Somos</h3>
                            <h5 className="text-purple-dark-lighter ms-4 mt-0 mb-4">Seguridad y Blockchain</h5>
                            <p>Somos una plataforma de banca digital que integra tecnología blockchain y cuentas online convencionales. Nuestro objetivo es ofrecer soluciones financieras innovadoras que se adapten a las necesidades de cada usuario. Ya sea a través de operaciones descentralizadas con contratos inteligentes o mediante cuentas tradicionales, garantizamos una experiencia segura, ágil y transparente, sin intermediarios innecesarios ni costos ocultos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}