export default function AccountCard (props:any) {
    return (
        <div>
            {props.id} , {props.name} , {props.type} , {props.balance}
        </div>
    );
}