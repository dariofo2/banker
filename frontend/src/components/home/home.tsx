import Image from "next/image";
import HeroComponent from "./hero";
import YourNewBankComponent from "./yourNewBank";
import WhyTrustComponent from "./whyTrust";
import ActionCall from "./actionCall";

export default function HomeComponent() {
    return (
        <div>
            <HeroComponent />
            <YourNewBankComponent />
            <WhyTrustComponent />
            <ActionCall />
        </div>
    )
}