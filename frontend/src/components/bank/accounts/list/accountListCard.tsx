import { Accounts } from "@/components/classes/entity/accounts.entity";

class Props {
    account?:Accounts
}

export default function AccountCardList (props:Props) {
    const account=props.account as Accounts;

    return (
        <div>
            <div className="">
                <h5>Number: {account.number}</h5>
                <h6>Type: {account.type}</h6>
                <h6>Balance: {account.balance}</h6>
            </div>
        </div>
    );
} 