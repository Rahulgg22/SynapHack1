import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { fetchMyPendingInvites, acceptInvite } from "../api/userEventRoles";

export default function Navbar() {
  const [invites, setInvites] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const data = await fetchMyPendingInvites();
        setInvites(Array.isArray(data) ? data : []);
      } catch {}
    })();
  }, []);
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f0f4] dark:border-b-[#2a2a30] px-10 py-3 bg-white dark:bg-[#111118]">
      <Link to="/" className="flex items-center gap-4 text-[#111118]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path></svg>
        </div>
  <h2 className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">DevARENA</h2>
      </Link>
      <div className="flex flex-1 justify-end gap-4">
        <nav className="flex items-center gap-9">
          <Link className="text-[#111118] dark:text-white text-sm font-medium leading-normal" to="/events">Events</Link>
          <Link className="text-[#111118] dark:text-white text-sm font-medium leading-normal" to="/organizer">Organizer</Link>
          <a className="text-[#111118] dark:text-white text-sm font-medium leading-normal" href="#features">Features</a>
          <a className="text-[#111118] dark:text-white text-sm font-medium leading-normal" href="#sponsors">Sponsors</a>
          {/* Leaderboard removed from navbar; it will be event-specific */}
        </nav>
        <ThemeToggle />
        {invites.length > 0 && (
          <div className="relative">
            <details className="group">
              <summary className="cursor-pointer text-[#111118] dark:text-white text-sm font-medium leading-normal">Invites ({invites.length})</summary>
              <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] p-3 shadow-xl">
                {invites.map((i, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <span className="text-[#111118] dark:text-white text-sm font-medium">{i.title}</span>
                      <span className="text-[#636388] dark:text-[#b3b3c6] text-xs">Judge invitation</span>
                    </div>
                    <button onClick={async ()=>{ await acceptInvite(i.event_id); localStorage.setItem('role','judge'); window.location.href='/judge'; }} className="px-3 py-1 rounded bg-[#686aed] text-white text-sm">Accept</button>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
        <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#686aed] text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Login/Register</span>
        </Link>
      </div>
    </header>
  );
}
