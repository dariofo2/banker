export default function YourNewBankComponent() {
    return (
        <div>
            <div className="container p-5">
                <h2 className="m-auto text-center mt-5 mb-5" style={{ maxWidth: 200 }}>Tu Nuevo Banco</h2>
                <div className="row pt-5 g-5">
                    <div className="col-6">
                        <div>
                            <h3>Nuestra Visión</h3>
                            <h5>Y esperamos que la tuya</h5>
                            <p>Creemos en una banca digital moderna, transparente y accesible. Por eso, combinamos lo mejor de la tecnología blockchain con la fiabilidad de las cuentas bancarias online tradicionales. Queremos que cada usuario tenga el poder de elegir cómo gestionar sus finanzas, siempre con seguridad, eficiencia y control total sobre sus activos.</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <img className="img-fluid" height={50} src="/next.svg"></img>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <img className="img-fluid" height={50} src="/next.svg"></img>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <h3>Quiénes Somos</h3>
                            <h5>Seguridad y Blockchain</h5>
                            <p>Somos una plataforma de banca digital que integra tecnología blockchain y cuentas online convencionales. Nuestro objetivo es ofrecer soluciones financieras innovadoras que se adapten a las necesidades de cada usuario. Ya sea a través de operaciones descentralizadas con contratos inteligentes o mediante cuentas tradicionales, garantizamos una experiencia segura, ágil y transparente, sin intermediarios innecesarios ni costos ocultos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}