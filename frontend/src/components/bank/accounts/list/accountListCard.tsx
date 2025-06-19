import { Accounts } from "@/components/classes/entity/accounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
class Props {
    account?: Accounts
}

export default function AccountCardList(props: Props) {
    const account = props.account as Accounts;

    async function sendToAccountView() {
        if (account?.type!="blocked") {
            axiosFetchs.setAccountIdCookie(account.id as number);
            window.location.href = `/bank/accounts/view`
        } else {
            toast.error("La cuenta está bloqueada", {
                containerId: "axios"
            })
        }
    }
    return (
        <div onClick={sendToAccountView} className={`${account.type=="blocked" ? "bg-danger" : ""} m-auto mt-3 border border-2 border-black px-5 py-4 shadow shadow-5`} style={{maxWidth: 700, backgroundColor: "whitesmoke", cursor: "pointer" }}>
            <div className= "d-flex flex-wrap  flex-sm-wrap justify-content-between overflow-hidden">
                <div className="">
                    <h6 className="fs-5" style={{color:"blueviolet"}}>Cuenta {account.type} Banker</h6>
                    <h6 className="fs-5">{account.number}</h6>
                </div>
                <div className="">
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