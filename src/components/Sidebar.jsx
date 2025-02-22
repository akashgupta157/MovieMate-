import React from "react";
import { Button } from "./ui/button";
import { Download, Globe, Inbox } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const param = usePathname();
  return (
    <div className="bg-black h-full min-w-56 rounded-lg py-5">
      <div className="text-white font-bold text-2xl p-5 flex items-center justify-center gap-2">
        <Globe className="size-8" />
        Almanack
      </div>
      <div className="flex flex-col gap-2 p-5">
        <Button
          className={`font-bold bg-black text-md ${
            (param === "/booking" || param === "/selection") &&
            "bg-white text-black hover:bg-white/80"
          }`}
          onClick={() => router.push("/booking")}
        >
          <Inbox strokeWidth={3} style={{ width: "20px", height: "20px" }} />
          Booking
        </Button>
        <Button
          className={`font-bold bg-black text-md ${
            param === "/activity" && "bg-white text-black hover:bg-white/80"
          }`}
          onClick={() => router.push("/activity")}
        >
          <Download strokeWidth={3} style={{ width: "20px", height: "20px" }} />
          Activity
        </Button>
      </div>
    </div>
  );
}
