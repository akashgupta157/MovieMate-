"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("isLoggedIn");
    if (isAuth) {
      router.push("/booking");
    } else {
      router.push("/login");
    }
  }, []);

  return null;
}
