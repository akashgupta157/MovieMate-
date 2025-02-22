"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { CircleUser } from "lucide-react";

export default function Layout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setIsAuth(true);
    } else {
      redirect("/login");
    }
  }, []);

  if (!isAuth) {
    return null; 
  }

  return (
    <div className="p-5 h-screen flex gap-5">
      <Sidebar />
      {children}
      <div className="absolute right-5 flex items-center space-x-2 font-bold">
        <div className="bg-[#D9D9D9] p-2 rounded-full">
          <CircleUser strokeWidth={2.5} />
        </div>
        <p>Naval Ravikant</p>
      </div>
    </div>
  );
}