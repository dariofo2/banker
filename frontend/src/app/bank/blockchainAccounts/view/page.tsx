import ViewBlockChainAccount from "@/components/bank/blockchainAccounts/view/viewBlockchainAccount";
import FooterComponent from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import SocketIOClient from "@/components/socket.io/socket.io";

export default function BlockChainAccountsViewPage () {
    return (
        <div>
        <NavBar />
        <ViewBlockChainAccount />
        <FooterComponent />
        <SocketIOClient />
        </div>
    )
}