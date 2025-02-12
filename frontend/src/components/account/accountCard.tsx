import { axiosFetchs } from "../axios";

const axios=new axiosFetchs();
export default function AccountCard (props:any) {
    async function onClickCard () {
        axios.setAccountIdCookie(props.id);
        location.href="/account/view";
    }

    async function onClickDelete () {
        await axios.removeAccount(props.id);
    }
    return (
        <div onClick={()=>onClickCard()}>
            {props.id} , {props.name} , {props.type} , {props.balance}
            <button onClick={()=>{onClickDelete}}>Delete</button>
        </div>
    );
}