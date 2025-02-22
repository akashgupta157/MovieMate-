"use client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { useState } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Selection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ticketHistory, setTicketHistory] = useState(
    JSON.parse(localStorage.getItem("ticketHistory") || "[]")
  );

  const movie = {
    id: searchParams.get("id"),
    title: searchParams.get("title"),
    backdrop_path: searchParams.get("backdrop_path"),
    release_date: searchParams.get("release_date"),
  };

  const [loading, setLoading] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    ticketCount: 1,
    date: new Date(),
    time: "12:00",
  });
  const handleBooking = () => {
    setLoading(true);
    const newTicketHistory = [
      ...ticketHistory,
      {
        ...ticketDetails,
        movie,
      },
    ];
    localStorage.setItem("ticketHistory", JSON.stringify(newTicketHistory));
    toast.success("Ticket Booked", {
      duration: 5000,
      style: {
        backgroundColor: "#15803d",
        color: "#ffffff",
      },
    });
    setTimeout(() => {
      setLoading(false);
      router.push("/activity");
    }, 5000);
  };

  return (
    <div className="flex flex-col space-y-5 p-5">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full max-w-md object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold">
        {movie.title} ({movie.release_date.split("-")[0]})
      </h1>
      <div className="flex items-center gap-10">
        <p className="font-bold w-28">Ticket Count</p>
        <div className="flex items-center gap-5 font-bold">
          <button
            className="text-2xl"
            onClick={() => {
              if (ticketDetails.ticketCount > 1) {
                setTicketDetails({
                  ...ticketDetails,
                  ticketCount: ticketDetails.ticketCount - 1,
                });
              }
            }}
          >
            -
          </button>
          <p
            className={`bg-black text-white font-bold shadow-md px-8 py-1 rounded-lg`}
          >
            {ticketDetails.ticketCount}
          </p>
          <button
            className="text-2xl"
            onClick={() => {
              if (ticketDetails.ticketCount < 10) {
                setTicketDetails({
                  ...ticketDetails,
                  ticketCount: ticketDetails.ticketCount + 1,
                });
              }
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <p className="font-bold w-28">Show Time</p>
        <p
          className={`flex items-center gap-2 cursor-pointer ${
            ticketDetails.time === "9:00"
              ? "bg-black text-white"
              : "bg-[#D9D9D9] text-black"
          }  font-bold px-8 py-1 rounded-lg`}
          onClick={() => {
            setTicketDetails({
              ...ticketDetails,
              time: "9:00",
            });
          }}
        >
          <Sun style={{ width: "20px", height: "20px" }} /> 9:00
        </p>
        <p
          className={`flex items-center gap-2 cursor-pointer ${
            ticketDetails.time === "12:00"
              ? "bg-black text-white"
              : "bg-[#D9D9D9] text-black"
          }  font-bold px-8 py-1 rounded-lg`}
          onClick={() => {
            setTicketDetails({
              ...ticketDetails,
              time: "12:00",
            });
          }}
        >
          <Globe style={{ width: "20px", height: "20px" }} /> 12:00
        </p>
        <p
          className={`flex items-center gap-2 cursor-pointer ${
            ticketDetails.time === "18:00"
              ? "bg-black text-white"
              : "bg-[#D9D9D9] text-black"
          }  font-bold px-8 py-1 rounded-lg`}
          onClick={() => {
            setTicketDetails({
              ...ticketDetails,
              time: "18:00",
            });
          }}
        >
          <Moon style={{ width: "20px", height: "20px" }} /> 18:00
        </p>
      </div>
      <div className="flex items-center gap-10">
        <p className="font-bold w-28">Date</p>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "bg-[#D9D9D9] hover:bg-[#D9D9D9] font-bold text-black w-fit justify-start text-left ",
                !ticketDetails.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon strokeWidth={2.5} />
              {ticketDetails.date ? (
                format(ticketDetails.date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              disabled={(date) => date < new Date() - 1000 * 60 * 60 * 24}
              selected={ticketDetails.date}
              onSelect={(date) => {
                setTicketDetails({
                  ...ticketDetails,
                  date,
                });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        className="font-bold w-fit px-16"
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Ticket"}
      </Button>
    </div>
  );
}
