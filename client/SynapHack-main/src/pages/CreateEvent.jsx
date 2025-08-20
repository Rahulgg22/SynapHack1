import React, { useState } from "react";
import { createEventAsOrganizer } from "../api/events";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [form, setForm] = useState({ name: "", description: "", start_date: "", end_date: "", registration_deadline: "", banner_url: "", domain: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await createEventAsOrganizer(form);
      // Immediately elevate role locally; backend will also confirm via organizer-status
      localStorage.setItem("role", "organizer");
      setSuccess("Event created. Redirecting to organizer dashboard...");
      setTimeout(() => navigate("/organizer"), 800);
    } catch (e) {
      setError(e?.message || "Failed to create event. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white dark:bg-[#111118] group/design-root overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[720px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111118] dark:text-white tracking-light text-[32px] font-bold leading-tight">Create Event</p>
                <p className="text-[#636388] dark:text-[#b3b3c6] text-sm">Any user can create an event and become its organizer.</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="px-4 py-3 flex flex-col gap-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Event Name" className="form-input rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] p-3 bg-white dark:bg-[#23232b] text-[#111118] dark:text-white" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-input rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] p-3 bg-white dark:bg-[#23232b] text-[#111118] dark:text-white min-h-36" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} placeholder="Start Date" className="form-input rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] p-3 bg-white dark:bg-[#23232b] text-[#111118] dark:text-white" />
                <input type="date" name="end_date" value={form.end_date} onChange={handleChange} placeholder="End Date" className="form-input rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] p-3 bg-white dark:bg-[#23232b] text-[#111118] dark:text-white" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="date" name="registration_deadline" value={form.registration_deadline} onChange={handleChange} placeholder="Registration Deadline" className="form-input rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] p-3 bg-white dark:bg-[#23232b] text-[#111118] dark:text-white" />
                <input name="banner_url" value={form.banner_url} onChange={handleChange} placeholder="Banner Image URL" className="form-input rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] p-3 bg-white dark:bg-[#23232b] text-[#111118] dark:text-white" />
              </div>
              <div>
                <input name="domain" value={form.domain} onChange={handleChange} placeholder="Event Domain (e.g., AI, Sustainability)" className="form-input w-full rounded-lg border border-[#dcdce5] dark:border-[#2a2a30] p-3 bg-white dark:bg-[#23232b] text-[#111118] dark:text-white" />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-600">{success}</div>}
              <div className="flex justify-start">
                <button disabled={loading} type="submit" className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#686aed] text-white text-sm font-bold disabled:opacity-60">
                  <span className="truncate">{loading ? 'Creating...' : 'Create Event'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


