export default function LegalAdvertStaticComponent() {
    return (
        <div className="container-fluid">
            <div className="container">
                {/* AVISO LEGAL */}
                <h2 className="mt-5">Aviso Legal</h2>
                <h4 className="mt-2">Datos Registrales</h4>
                <ul className="list-group mt-3">
                    <li className="list-group-item"><strong>► Nombre: </strong>Banker S.L</li>
                    <li className="list-group-item"><strong>► Domicilio: </strong>Avenida del Congreso 36 Bajo, Ourense</li>
                    <li className="list-group-item"><strong>► Email: </strong>Banker@gmail.com</li>
                    <li className="list-group-item"><strong>► Registro Mercantil: </strong>AAAA-BBBB</li>
                </ul>

                {/* TÉRMINOS DE USO */}
                <h4 className="mt-5">Términos de Uso</h4>
                <ul className="list-group mt-3">
                    <li className="list-group-item"><strong>► Propiedad Intelectual: </strong>Banker S.L</li>
                    <li className="list-group-item"><strong>► Responsabilidad del titular de la web en caso de caídas de los
                        servicios, mal funcionamiento de la web o virus: </strong>El titular se hace responsable de
                        las caidas de los servicios y mal funcionamiento de la Web siempre y cuando la
                        empresa sea culpable de ello. El titular no se responsabiliza de virus.</li>
                    <li className="list-group-item"><strong>► Responsabilidad por links externos: </strong>El titular se hace responsable de
                los links externos proporcionados por la página, no por los proporcionados por
                sus usuarios.</li>
                    <li className="list-group-item"><strong>► Prohibiciones de conductas del usuario y otras condiciones de uso
                    de la web: </strong>Está prohíbido el uso de una cuenta que no sea del propio usuario
                que accede a ella. No puede crear cuentas aquel que esté en la lista de morosos.
                No está permitido usar esta web para propiciar ningún tipo de robo o estafa. Si
                se detecta algún tipo de actividad fraudulenta o incorrecta se procederá al
                bloqueo de la cuenta.</li>
                    <li className="list-group-item"><strong>► Responsabilidad Monetaria: </strong>El titular se hace cargo del dinero del
                cliente. El titular se responsabiliza de cualquier problema en la empresa o cierre
                repentino del banco. Teniendo un seguro de 100.000 € de máximo por cliente. A
                partir de esa cantidad el titular no se hace cargo de las pérdidas.</li>
                </ul>

                {/* LEYES */}
                <h4 className="mt-5">Leyes</h4>
                <h6>Esta Web cumple con las siguientes leyes:</h6>
                <ul className="list-group mt-3">
                    <li className="list-group-item"><strong>► Ley orgánica 3/2018, de 5 de diciembre, de Protección de Datos
                    Personales y garantía de los derechos digitales(LOPDPGDD)</strong></li>
                    <li className="list-group-item"><strong>► Reglamento General de Protección de Datos (RGPD)</strong></li>
                    <li className="list-group-item"><strong>► Ley de Servicios de la Sociedad de la Información y el comercio
                    electrónico (LSSI-CE)</strong></li>
                </ul>
            </div>

        </div>
    );
}