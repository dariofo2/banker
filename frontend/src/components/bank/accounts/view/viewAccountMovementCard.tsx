import { Accounts } from "@/components/classes/entity/accounts.entity";
import { Movements } from "@/components/classes/entity/movements.entity";

class Props {
    movement?:Movements;
    onClickDelete=(movement:Movements)=>{}
}
export default function ViewAccountMovementCard (props:Props) {
    const movement=props.movement;

    return (
       <div>
            <div>
                <h3>From: {movement?.originAccount?.number}</h3>
                <h3>From Name {movement?.originAccount?.user?.name}</h3>
                <h4>To: {movement?.destinationAccount?.number}</h4>
                <h4>To Name: {movement?.destinationAccount?.user?.name}</h4>
                <h5>Money: {movement?.money}</h5>

                <button className="btn btn-outline-danger" onClick={()=>props.onClickDelete(movement as Movements)}>Borrar</button>
            </div>
       </div> 
    );
}