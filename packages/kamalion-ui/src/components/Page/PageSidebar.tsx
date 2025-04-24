"use client";

import { ReactNode, useEffect } from "react";
import { Sidebar } from "../Sidebar";
import { cn, useSidebar } from "../..";
import { FaXmark } from "react-icons/fa6";
import { useLocation } from "react-router";

interface PageSidebarProps {
  children?: ReactNode;
  className?: string;
}

export function PageSidebar({ children, className }: PageSidebarProps) {
  const { visible, toggleSidebar, setVisible } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  const classes = cn(
    "itc-page-sidebar fixed md:relative md:left-0 z-20 h-full flex-col w-[280px] min-w-[280px] max-w-[280px] md:flex transition-all duration-300",
    visible ? "left-0" : "-left-[350px]",
    className
  );

  if (children) {
    return (
      <div className={classes}>
        <div
          className="md:hidden absolute -right-10 top-1 text-4xl text-zinc-700"
          onClick={toggleSidebar}
        >
          <FaXmark />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="md:hidden absolute -right-10 top-1 text-4xl text-zinc-700"
        onClick={toggleSidebar}
      >
        <FaXmark />
      </div>
      <Sidebar.Content>
        {/* <Sidebar.Menu /> */}
        a
      </Sidebar.Content>
    </div>
  );
}

