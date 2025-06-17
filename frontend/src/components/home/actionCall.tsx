"use client"
export default function ActionCall () {
    return (
        <div className="gradientBlueWhite text-white p-5">
            <div className="py-5 my-5 text-center m-auto" style={{maxWidth:500}}>
                <h2 className="mt-5 mb-4">Ven a nuestro banco</h2>
                <p className="mb-5">¿A qué esperas? Conviértete en nuestro cliente y hazte dueño de interminables ofertas que te harán ahorrar</p>
                <button className="btn btn-danger px-5 py-3 fs-5" onClick={()=>window.location.href="/bank/users/register"}>Hazte Cliente</button>
            </div>
        </div>
    );
}