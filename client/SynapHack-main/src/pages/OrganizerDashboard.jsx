import React, { useEffect, useState } from "react";
import { fetchMyOrganizedEvents, createEventAsOrganizer } from "../api/events";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", start_date: "", end_date: "" });
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchMyOrganizedEvents();
        if (mounted) setEvents(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || "Failed to load organizer events");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  async function handleCreateEvent(e) {
    e.preventDefault();
    try {
      setCreating(true);
      await createEventAsOrganizer(form);
      const data = await fetchMyOrganizedEvents();
      setEvents(Array.isArray(data) ? data : []);
      setForm({ name: "", description: "", start_date: "", end_date: "" });
    } catch (e) {
      setError(e?.message || "Failed to create event");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#111118] text-base font-medium leading-normal">InnovateU Admin</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#f0f0f4]">
                    <div className="text-[#111118]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path></svg>
                    </div>
                    <p className="text-[#111118] text-sm font-medium leading-normal">Dashboard</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2"><p className="text-[#111118] text-sm font-medium leading-normal">Events</p></div>
                  <div className="flex items-center gap-3 px-3 py-2"><p className="text-[#111118] text-sm font-medium leading-normal">Participants</p></div>
                  <div className="flex items-center gap-3 px-3 py-2"><p className="text-[#111118] text-sm font-medium leading-normal">Judges</p></div>
                  <div className="flex items-center gap-3 px-3 py-2"><p className="text-[#111118] text-sm font-medium leading-normal">Announcements</p></div>
                  <div className="flex items-center gap-3 px-3 py-2"><p className="text-[#111118] text-sm font-medium leading-normal">Analytics</p></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2"><p className="text-[#111118] text-sm font-medium leading-normal">View Site</p></div>
              </div>
            </div>
          </div>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111118] tracking-light text-[32px] font-bold leading-tight">Dashboard Overview</p>
                <p className="text-[#636388] text-sm font-normal leading-normal">Manage your hackathon event effectively.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f0f4]"><p className="text-[#111118] text-base font-medium leading-normal">Total Participants</p><p className="text-[#111118] tracking-light text-2xl font-bold leading-tight">—</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f0f4]"><p className="text-[#111118] text-base font-medium leading-normal">Active Projects</p><p className="text-[#111118] tracking-light text-2xl font-bold leading-tight">—</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f0f4]"><p className="text-[#111118] text-base font-medium leading-normal">Judges Assigned</p><p className="text-[#111118] tracking-light text-2xl font-bold leading-tight">—</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#f0f0f4]"><p className="text-[#111118] text-base font-medium leading-normal">Announcements Sent</p><p className="text-[#111118] tracking-light text-2xl font-bold leading-tight">—</p></div>
            </div>
            <h2 className="text-[#111118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Events Management</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dcdce5] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111118] w-[400px] text-sm font-medium leading-normal">Event Name</th>
                      <th className="px-4 py-3 text-left text-[#111118] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-[#111118] w-[400px] text-sm font-medium leading-normal">Start Date</th>
                      <th className="px-4 py-3 text-left text-[#111118] w-[400px] text-sm font-medium leading-normal">End Date</th>
                      <th className="px-4 py-3 text-left text-[#111118] w-60 text-[#636388] text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev, idx) => (
                      <tr key={idx} className="border-t border-t-[#dcdce5]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#111118] text-sm">{ev.name || ev.title}</td>
                        <td className="h-[72px] px-4 py-2 w-60 text-sm">
                          <button className="flex min-w-[84px] items-center justify-center rounded-lg h-8 px-4 bg-[#f0f0f4] text-[#111118] text-sm w-full"><span className="truncate">Active</span></button>
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#636388] text-sm">{(ev.start_date || '').slice(0,10)}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#636388] text-sm">{(ev.end_date || '').slice(0,10)}</td>
                        <td className="h-[72px] px-4 py-2 w-60 text-[#636388] text-sm font-bold">Edit | Delete</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <form onSubmit={handleCreateEvent} className="flex flex-col gap-2 w-full max-w-xl">
                <div className="grid grid-cols-2 gap-2">
                  <input className="form-input rounded-lg border border-[#dcdce5] p-2" placeholder="Event Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
                  <input className="form-input rounded-lg border border-[#dcdce5] p-2" placeholder="Start Date (YYYY-MM-DD)" value={form.start_date} onChange={(e)=>setForm({...form, start_date:e.target.value})} />
                  <input className="form-input rounded-lg border border-[#dcdce5] p-2" placeholder="End Date (YYYY-MM-DD)" value={form.end_date} onChange={(e)=>setForm({...form, end_date:e.target.value})} />
                  <input className="form-input rounded-lg border border-[#dcdce5] p-2 col-span-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button disabled={creating} className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#686aed] text-white text-sm font-bold disabled:opacity-60" type="submit">
                  <span className="truncate">{creating ? 'Creating...' : 'Create New Event'}</span>
                </button>
              </form>
            </div>
            <h2 className="text-[#111118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Announcements</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <textarea placeholder="Write your announcement here..." value={announcement} onChange={(e)=>setAnnouncement(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] focus:outline-0 focus:ring-0 border border-[#dcdce5] bg-white focus:border-[#dcdce5] min-h-36 p-[15px] text-base" />
              </label>
            </div>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <button className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#686aed] text-white text-sm font-bold"><span className="truncate">Post Announcement</span></button>
                <button className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#f0f0f4] text-[#111118] text-sm font-bold"><span className="truncate">Schedule Announcement</span></button>
              </div>
            </div>
            <h2 className="text-[#111118] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Judges Panel</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dcdce5] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111118] w-[400px] text-sm font-medium leading-normal">Judge Name</th>
                      <th className="px-4 py-3 text-left text-[#111118] w-[400px] text-sm font-medium leading-normal">Specialization</th>
                      <th className="px-4 py-3 text-left text-[#111118] w-[400px] text-sm font-medium leading-normal">Projects Assigned</th>
                      <th className="px-4 py-3 text-left text-[#111118] w-[400px] text-sm font-medium leading-normal">Scoring Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dcdce5]"><td className="h-[72px] px-4 py-2 w-[400px] text-[#111118] text-sm">—</td><td className="h-[72px] px-4 py-2 w-[400px] text-[#636388] text-sm">—</td><td className="h-[72px] px-4 py-2 w-[400px] text-[#636388] text-sm">—</td><td className="h-[72px] px-4 py-2 w-[400px] text-sm">—</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


