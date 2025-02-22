"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Activity() {
  const [ticketHistory, setTicketHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("ticketHistory") || "[]"
    );
    setTicketHistory(storedHistory);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Activity</h1>

      {ticketHistory.length === 0 ? (
        <p className="text-gray-500">No tickets booked yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b-2 border-black">
                <th className="p-4">ID</th>
                <th className="p-4 text-center">Movie</th>
                <th className="p-4">Tickets</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Time</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {ticketHistory.map((ticket, index) => (
                <tr key={index} className="border-b-2 border-black">
                  <td className="p-4">{String(index + 1).padStart(2, "0")}</td>
                  <td className="p-4">{ticket.movie.title}</td>
                  <td className="p-4 text-center">{ticket.ticketCount}</td>
                  <td className="p-4">
                    ${(ticket.ticketCount * 25).toFixed(2)}
                  </td>
                  <td className="p-4">{ticket.time}</td>
                  <td className="p-4">
                    {format(new Date(ticket.date), "dd-MM-yy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
