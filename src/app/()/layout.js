"use client";
import React from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { CircleUser } from "lucide-react";

export default function layout({ children }) {
  const isAuth = localStorage.getItem("isLoggedIn");
  if (isAuth) {
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
  } else {
    redirect("/login");
  }
}
