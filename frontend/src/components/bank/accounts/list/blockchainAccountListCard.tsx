import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";
import { axiosFetchs } from "@/components/utils/axios";
class Props {
    blockchainAccount?:BlockchainAccounts
}

export default function BlockchainAccountCardList (props:Props) {
    const blockchainAccount=props.blockchainAccount as BlockchainAccounts;

    async function goToBlockChainAccountView () {
        await axiosFetchs.setBlockchainAccountIdCookie(blockchainAccount.id as number);
        window.location.href=`/bank/blockchainAccounts/view`;
    }
    return (
        <div>
            <div className="" onClick={goToBlockChainAccountView}>
                <h5>Address: {blockchainAccount.address}</h5>
            </div>
        </div>
    );
} 