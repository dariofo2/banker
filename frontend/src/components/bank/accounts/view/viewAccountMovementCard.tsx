import { Accounts } from "@/components/classes/entity/accounts.entity";
import { Movements } from "@/components/classes/entity/movements.entity";

class Props {
    movement:Movements={};
    account:Accounts={};
    money= {
        moneyOld: 0,
        moneyNew: 0
    }
    onClickDelete=(movement:Movements)=>{}
}
export default function ViewAccountMovementCard (props:Props) {
    const movement=props.movement;
    const account=props.account;
    switch (movement.type) {
        case "movement":
            if (movement.originAccount?.number==account.number) {
                return (
                    <div className="m-auto mt-3 border border-5 border-danger rounded rounded-5 bg-light-subtle px-5 py-2 shadow shadow-5" style={{maxWidth:500, backgroundColor:"whitesmoke"}}>
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <h6 className="text-primary fs-5">Destino</h6>
                                <h6 className="fs-5">{movement.destinationAccount?.user?.name}</h6>
                                <h6 className="fs-6">{movement.destinationAccount?.number}</h6>
                                {/*<h6 className="fs-6">Concepto: {movement.concept}</h6>*/}
                            </div>
                            <div className="col-5">
                                <div className="text-end mt-2">
                                    <h5 className="text-danger fw-bolder">-{movement.money} €</h5>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h6 className="fs-6 text-start">Concepto: {movement.concept}</h6>
                            <button className="btn btn-sm btn-outline-danger" onClick={()=>props.onClickDelete(movement as Movements)}>Borrar</button>
                        </div>
                        
                    </div>
                );
            } else {
                return (
                    <div className="m-auto mt-3 border border-5 border-success rounded rounded-5 bg-light-subtle px-5 py-2 shadow shadow-5" style={{maxWidth:500, backgroundColor:"whitesmoke"}}>
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <h6 className="text-primary fs-5">Origen</h6>
                                <h6 className="fs-5">{movement.originAccount?.user?.name}</h6>
                                <h6 className="fs-6">{movement.originAccount?.number}</h6>
                            </div>
                            <div className="col-5">
                                <div className="text-end mt-2">
                                    <h5 className="text-success fw-bolder">{movement.money} €</h5>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h6 className="fs-6">Concepto: {movement.concept}</h6>
                            <button className="btn btn-sm btn-outline-danger" onClick={()=>props.onClickDelete(movement as Movements)}>Borrar</button>
                        </div>
                        
                    </div>
                );
            }
            
        break;
        case "deposit":
            return (
                <div className="m-auto mt-3 border border-5 border-info rounded rounded-5 bg-light-subtle px-5 py-2 shadow shadow-5" style={{maxWidth:500, backgroundColor:"whitesmoke"}}>
                    <div className="row justify-content-between overflow-hidden">
                        <div className="col-6">
                            <h6 className="text-primary fs-5">Ingreso</h6>
                            <h6 className="fs-5">{movement.destinationAccount?.user?.name}</h6>
                            <h6 className="fs-6">{movement.concept}</h6>
                        </div>
                        <div className="col-5">
                            <div className="text-end mt-2">
                                <h5 className="text-success fw-bolder">{movement.money} €</h5>
                                
                            </div>
                        </div>
                    </div>
                    <div className="text-center">

                    </div>
                    
                </div>
            );
        break;
        case "depositToBlockchain":
            return (
                <div className="m-auto mt-3 border border-5 border-warning rounded rounded-5 bg-light-subtle px-5 py-2 shadow shadow-5" style={{maxWidth:500, backgroundColor:"whitesmoke"}}>
                    <div className="row justify-content-between overflow-hidden">
                        <div className="col-6">
                            <h6 className="text-primary fs-5">Deposito</h6>
                            <h6 className="fs-5">{movement.destinationAccount?.user?.name}</h6>
                            <h6 className="fs-6">{movement.concept}</h6>
                        </div>
                        <div className="col-5">
                            <div className="text-end mt-2">
                                <h5 className="text-danger fw-bolder">-{movement.money} €</h5>
                                
                            </div>
                        </div>
                    </div>
                    <div className="text-center">

                    </div>
                    
                </div>
            );
        break;
    }
    /*
    return (
       <div>
            <div>
                <h3>From: {movement?.originAccount?.number}</h3>
                <h3>From Name {movement?.originAccount?.user?.name}</h3>
                <h4>To: {movement?.destinationAccount?.number}</h4>
                <h4>To Name: {movement?.destinationAccount?.user?.name}</h4>
                <h5>Money: {movement?.money}</h5>
                <h5>Money New:  {props.money.moneyNew}</h5>
                <h5><del>Money Old:  {props.money.moneyOld}</del></h5>
                <button className="btn btn-outline-danger" onClick={()=>props.onClickDelete(movement as Movements)}>Borrar</button>
            </div>
       </div> 
    );
    */
}