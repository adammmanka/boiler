import { SidebarProvider } from "@/context/SidebarContext";
import type { ReactNode } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import clsx from 'clsx'

import BottomNav from "./BottomNav";
import Header from "../Header/Header";

type LayoutProps = {
  title?: string
  children: ReactNode;
  className?: string
};

const Layout = ({ title, children, className }: LayoutProps) => {
  return ( 
    <div>
      <SidebarProvider>
    <div className={clsx(className, 'bg-base-200')}>
      <Sidebar>
        <div className="flex min-h-screen flex-col">
          <Header title={title} />

          <div className="mx-4 mb-4 block flex-grow">{children}</div>
          
        </div>
      </Sidebar>
    </div>
  </SidebarProvider>
      <BottomNav />
    </div>
    
    
  );
};

export default Layout;
