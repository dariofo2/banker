import { Accounts } from "@/components/classes/entity/accounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
import Cookies from "js-cookie";
class Props {
    account?:Accounts
}

export default function AccountCardList (props:Props) {
    const account=props.account as Accounts;

    async function sendToAccountView () {
        axiosFetchs.setAccountIdCookie(account.id as number);
        window.location.href=`/bank/accounts/view`
    }
    return (
        <div onClick={sendToAccountView}>
            <div className="">
                <h5>Number: {account.number}</h5>
                <h6>Type: {account.type}</h6>
                <h6>Balance: {account.balance}</h6>
            </div>
        </div>
    );
} 