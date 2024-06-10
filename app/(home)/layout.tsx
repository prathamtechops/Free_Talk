import { MobileNavbar } from "@/components/shared/MobileNavbar";
import { Navbar } from "@/components/shared/Navbar";
import { Sidebar } from "@/components/shared/Sidebar";
import { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <section className="flex flex-1 overflow-hidden">
        <Sidebar/>
        <section className="bg-dark800_light100   grow overflow-y-auto p-10 ">
          {children}
        </section>
      </section>
      <MobileNavbar />
    </main>
  );
};

export default HomeLayout;
