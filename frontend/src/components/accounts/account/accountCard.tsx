import { axiosFetchs } from "@/components/utils/axios";

export default function AccountCard (props:any) {
    async function onClickCard () {
        axiosFetchs.setAccountIdCookie(props.id);
        location.href="/account/view";
    }

    async function onClickDelete () {
        await axiosFetchs.removeAccount(props.id);
    }
    return (
        <div onClick={()=>onClickCard()}>
            {props.id} , {props.name} , {props.type} , {props.balance}
            <button onClick={()=>{onClickDelete}}>Delete</button>
        </div>
    );
}