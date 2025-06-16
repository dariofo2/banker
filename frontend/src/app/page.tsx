import FooterComponent from "@/components/footer/footer";
import HomeComponent from "@/components/home/home";
import Image from "next/image";
import NavBar from "@/components/navbar/navbar";
import { cookies } from "next/headers";
import { Users } from "@/components/classes/entity/users.entity";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookie=await cookies();
  const user:Users=cookie.has("user") ? JSON.parse(cookie.get("user")?.value as string) : undefined;
  
  if (user) redirect("/bank/accounts/list");
  return (
  <div>
    <NavBar user={user}/>
    <HomeComponent />
    <FooterComponent />
  </div>
  );
}
