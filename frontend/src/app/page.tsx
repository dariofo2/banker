import FooterComponent from "@/components/footer/footer";
import HeaderComponent from "@/components/navbar/navbar";
import HomeComponent from "@/components/home/home";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <HeaderComponent />
    <HomeComponent />
    <FooterComponent />
  </div>
  );
}
