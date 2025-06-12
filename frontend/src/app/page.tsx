import FooterComponent from "@/components/footer/footer";
import HomeComponent from "@/components/home/home";
import Image from "next/image";
import NavBar from "@/components/navbar/navbar";

export default function Home() {
  return (
  <div>
    <NavBar />
    <HomeComponent />
    <FooterComponent />
  </div>
  );
}
