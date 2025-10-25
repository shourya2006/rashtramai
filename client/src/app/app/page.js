"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  FileText, 
  Brain
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BillsListUI from '../bills/page';
import SettingsPage from "../settings/page";
import Dashboard from "../dashboard/page";

function SidebarDemo() {
  const [activeView, setActiveView] = useState("Dashboard");
  
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveView("Dashboard")
    },
    {
      label: "Parliament Bills",
      href: "#",
      icon: (
        <Brain className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveView("Parliament Bills")
    },
    {
      label: "Parliament Acts",
      href: "#",
      icon: (
        <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveView("Parliament Acts")
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveView("Settings")
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => setActiveView("Logout")
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Fixed Desktop Sidebar */}
      <div className="fixed left-0 top-0 z-10 h-screen hidden md:block">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 h-full">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={link.onClick}
                    className={cn(
                      "cursor-pointer transition-colors duration-200",
                      activeView === link.label && "bg-primary/10 rounded-lg"
                    )}
                  >
                    <SidebarLink
                      link={{
                        ...link,
                        icon: React.cloneElement(link.icon, {
                          className: cn(
                            "h-5 w-5 flex-shrink-0",
                            activeView === link.label
                              ? "text-primary"
                              : "text-neutral-700 dark:text-neutral-200"
                          ),
                        }),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Shourya Bafna",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-semibold text-sm">
                      SB
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden w-full">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={link.onClick}
                    className={cn(
                      "cursor-pointer transition-colors duration-200",
                      activeView === link.label && "bg-primary/10 rounded-lg"
                    )}
                  >
                    <SidebarLink
                      link={{
                        ...link,
                        icon: React.cloneElement(link.icon, {
                          className: cn(
                            "h-5 w-5 flex-shrink-0",
                            activeView === link.label
                              ? "text-primary"
                              : "text-neutral-700 dark:text-neutral-200"
                          ),
                        }),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Shourya Bafna",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-semibold text-sm">
                      SB
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 h-screen overflow-auto transition-all duration-300 ease-in-out",
          "pt-14 md:pt-0",
          "ml-0 md:ml-[60px]",
          open && "md:ml-[300px]"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="h-full w-full" // ✅ make sure this exists
          >
            {renderActiveView(activeView)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
  
  function renderActiveView(view) {
    switch(view) {
      case "Dashboard":
        return (
          <div className="w-screen h-screen overflow-x-hidden">
            <Dashboard />
          </div>
        );
      case "Parliament Bills":
        return (
          <div className="w-434 h-screen overflow-x-hidden">
            <BillsListUI />
          </div>
        );
      case "Parliament Acts":
        return (
          <div className="w-434 h-screen overflow-x-hidden">
            <BillsListUI />
          </div>
        );
      case "Settings":
        return (
          <div className="w-screen h-screen overflow-x-hidden">
            <SettingsPage />
          </div>
        );
      case "Logout":
        return (
          <div className="p-6 bg-background h-full">
            <h1 className="text-2xl font-bold mb-4">Logout</h1>
            <p className="text-muted-foreground">Logout functionality coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  }
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent"
      >
        Rashtram AI
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};



export default function App() {
  return (
    <main className="flex min-h-screen">
      <SidebarDemo />
    </main>
  );
}
