import { BlockchainAccounts } from "@/components/classes/entity/blockchainAccounts.entity";

class Props {
    blockchainAccount?:BlockchainAccounts
}

export default function BlockchainAccountCardList (props:Props) {
    const blockchainAccount=props.blockchainAccount as BlockchainAccounts;

    return (
        <div>
            <div className="">
                <h5>Address: {blockchainAccount.address}</h5>
            </div>
        </div>
    );
} 