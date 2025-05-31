class Props {
    title?: string;
    subtitle?: string;
}

export default function FrontStaticComponent (props:Props) {
    return (
        <div className="container-fluid gradientPinkBlack text-white" style={{minHeight:"70vh"}}>
            <div className="container align-content-center text-center" style={{minHeight:"70vh"}}>
                <h2>{props.title}</h2>
                <p>{props.subtitle}</p>
            </div>
        </div>
    );
}