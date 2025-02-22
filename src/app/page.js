"use client";
import { redirect } from "next/navigation";
export default function Home() {
  const isAuth = localStorage.getItem("isLoggedIn");
  if (isAuth) {
    redirect("/booking");
  } else {
    redirect("/login");
  }
}
