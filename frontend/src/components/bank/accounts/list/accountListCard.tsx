import { Accounts } from "@/components/classes/entity/accounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
import Cookies from "js-cookie";
class Props {
    account?: Accounts
}

export default function AccountCardList(props: Props) {
    const account = props.account as Accounts;

    async function sendToAccountView() {
        axiosFetchs.setAccountIdCookie(account.id as number);
        window.location.href = `/bank/accounts/view`
    }
    return (
        <div onClick={sendToAccountView} className="m-auto mt-3 border border-2 border-black px-5 py-2 shadow shadow-5" style={{maxWidth: 500, backgroundColor: "whitesmoke" }}>
            <div className="row justify-content-between overflow-hidden">
                <div className="col-6">
                    <h6 className="text-primary fs-5">Cuenta {account.type} Banker</h6>
                    <h6 className="fs-5">{account.number}</h6>
                </div>
                <div className="col-5">
                    <div className="text-end mt-2">
                        <h5 className="text-warning fw-bolder">{account.balance} €</h5>
                    </div>
                </div>
            </div>
            <div className="text-center">
            </div>
        </div>
    );
} 