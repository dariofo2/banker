export default function BlockchainStaticComponent () {
    return (
        <div>
            <div className="container p-3 px-4 pb-5 montserrat">
                <div className="row pt-5 g-3 g-lg-5 align-items-center">
                    <div className="col-lg-6 order-1 order-lg-0">
                        <div>
                            <h3 className="text-purple-dark mb-0">Tu cuenta de Blockchain</h3>
                            <h5 className="text-purple-dark-lighter ms-4 mt-0 mb-4">Información</h5>
                            <p>Usa nuestro banco para gestionar tu cuenta de BlockChain de forma segura. Tus claves nunca salen al exterior, todo el proceso de firmas y de claves privadas se hacen en cliente. Además de esto, la clave viene encriptada en AES-256 con doble clave secreta, por lo que es imposible ningún tipo de fallo en seguridad.
                                <br /><br />
                            Somos los mejores en el sector, déjanos demostrártelo.</p>
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
                            <p>BC es nuestra criptomoneda estable, basada en el valor del Euro. Somos la entidad emisora de esta, y regalamos 1.000.000 de € en forma de minado. Su minado se realiza en base a nuestro sistema BlockChain Buildings, el cual consiste en comprar edificios que generan BC con el paso del tiempo. Puedes mejorarlos, comprar más y venderlos para hacerte con nuestra Criptomoneda.
                            <br /><br />
                            En el futuro se podrán hacer varias cosas con esta moneda, como canjearla por Dinero o realizar algunas acciones especiales en Banker.
                            <br /><br />
                            Este sistema es accesible desde cualquier cuenta de BlockChain que añadas a Banker. A que esperas?</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-black text-white">
                <div className="container py-5 px-4">
                    <h5 className="text-pink-dark-lighter text-end">Por si no lo sabías...</h5>
                    <h2 className="text-pink-dark mt-5 mb-4">¿Qué es BlockChain?</h2>
                    <p className="pb-5">
                        Blockchain es una tecnología que permite el registro seguro y transparente de transacciones sin necesidad de intermediarios. Funciona como un libro de contabilidad digital distribuido, donde cada bloque de información está conectado al anterior y protegido mediante criptografía. Su diseño hace que sea prácticamente imposible alterar los datos sin el consenso de la red, lo que la hace ideal para aplicaciones como criptomonedas, contratos inteligentes y gestión de activos digitales.
                    </p>
                    <h2 className="text-pink-dark mt-5 mb-4">¿Qué es un Smart Contract?</h2>
                    <p>
                        Un smart contract es un programa digital autoejecutable que funciona en una blockchain. Define reglas y condiciones acordadas por las partes, y se ejecuta automáticamente cuando se cumplen esos criterios, sin necesidad de intermediarios. Esto garantiza transacciones seguras, transparentes e inmutables, y se usa para aplicaciones como pagos automatizados, acuerdos comerciales y gestión de activos digitales.
                    </p>
                </div>
            </div>
        </div>
    )
}