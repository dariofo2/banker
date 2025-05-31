export default function MovementCard (props:any) {
    return (
        <div>
            id: {props.id}
            Origen: {props.originAccount}
            Destino: {props.destinationAccount}
            Dinero: {props.money}
        </div>
    );
}