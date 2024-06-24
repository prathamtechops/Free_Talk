import { ChatSidebar } from "@/components/shared/ChatPageSidebar";
import { MobileNavbar } from "@/components/shared/MobileNavbar";
import { Navbar } from "@/components/shared/Navbar";
import { PropsWithChildren } from "react";

const ChatLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <section className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <section className="bg-dark800_light100  grow  overflow-y-auto py-5 sm:p-6  md:p-10">
          {children}
        </section>
      </section>
      <MobileNavbar />
    </main>
  );
};

export default ChatLayout;
