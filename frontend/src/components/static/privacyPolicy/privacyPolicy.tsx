export default function PrivacyPoliciyComponent() {
    return (
        <div className="container-fluid">
            <div className="container">
                {/* Privacy Policy */}
                <h4 className="mt-5">Política de Privacidad</h4>
                <ul className="list-group mt-3">
                    <li className="list-group-item"><strong>► Responsable del Tratamiento: </strong>Banker S.L</li>
                    <li className="list-group-item"><strong>► Responsable en material de protección de datos: </strong>Banker S.L</li>
                    <li className="list-group-item"><strong>► Finalidad del tratamiento: </strong> Los datos personales se usarán para la
                        empresa únicamente, usar los datos para verificar que la persona existe, enviar
                        comunicados por Email o llamar por teléfono si es necesario contactar con el
                        cliente.Los datos no serán enviados para fines publicitarios ni análisis de datos a
                        ninguna empresa externa.</li>
                    <li className="list-group-item"><strong>Plazo de conservación: </strong>Hasta que el usuario decida eliminar su cuenta y finalizar el procesamiento de los datos personales.</li>
                </ul>
            </div>
        </div>
    );
}