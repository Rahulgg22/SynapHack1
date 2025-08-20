// Layout is handled in App.jsx
import React, { useState } from "react";
import { createSubmission } from "../api/submissions";
import { useSearchParams } from "react-router-dom";

export default function SubmitProject() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [track, setTrack] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  const selectButtonSvg = "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(99,99,136)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      setLoading(true);
      await createSubmission({
        event_id: Number(eventId) || undefined,
        project_name: projectTitle,
        github_url: "",
        demo_video_url: "",
        files: [],
        description: projectDescription,
        track,
        team_name: teamName,
        team_members: teamMembers.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setMessage("Submission saved.");
    } catch (e) {
      setError(e?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-40 flex justify-center py-5" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif', ['--select-button-svg']: selectButtonSvg }}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between"><p className="text-[#111118] text-base font-medium leading-normal">Step 3 of 4</p></div>
          <div className="rounded bg-[#dcdce5]"><div className="h-2 rounded bg-[#111118]" style={{ width: '75%' }}></div></div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111118] tracking-light text-[32px] font-bold leading-tight min-w-72">Submit Your Project</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-[#111118] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Project Details</h3>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] text-base font-medium leading-normal pb-2">Project Title</p>
              <input
                placeholder="Enter project title"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] focus:outline-0 focus:ring-0 border border-[#dcdce5] bg-white focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] text-base font-medium leading-normal pb-2">Project Description</p>
              <textarea
                placeholder="Describe your project"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] focus:outline-0 focus:ring-0 border border-[#dcdce5] bg-white focus:border-[#dcdce5] min-h-36 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              ></textarea>
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] text-base font-medium leading-normal pb-2">Track Selection</p>
              <select
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] focus:outline-0 focus:ring-0 border border-[#dcdce5] bg-white focus:border-[#dcdce5] h-14 bg-[image:--select-button-svg] placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
              >
                <option value="">Select track</option>
                <option value="ai">AI</option>
                <option value="web">Web Dev</option>
                <option value="mobile">Mobile</option>
                <option value="cyber">Cybersecurity</option>
              </select>
            </label>
          </div>

          <h3 className="text-[#111118] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Uploads</h3>
          <div className="flex flex-col p-4">
            <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dcdce5] px-6 py-14">
              <div className="flex max-w-[480px] flex-col items-center gap-2">
                <p className="text-[#111118] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Upload Documents</p>
                <p className="text-[#111118] text-sm font-normal leading-normal max-w-[480px] text-center">Drag and drop files here or browse</p>
              </div>
              <button type="button" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f0f4] text-[#111118] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Browse Files</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dcdce5] px-6 py-14">
              <div className="flex max-w-[480px] flex-col items-center gap-2">
                <p className="text-[#111118] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Upload GitHub Link</p>
                <p className="text-[#111118] text-sm font-normal leading-normal max-w-[480px] text-center">Drag and drop files here or browse</p>
              </div>
              <button type="button" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f0f4] text-[#111118] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Browse Files</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dcdce5] px-6 py-14">
              <div className="flex max-w-[480px] flex-col items-center gap-2">
                <p className="text-[#111118] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Upload Video Link</p>
                <p className="text-[#111118] text-sm font-normal leading-normal max-w-[480px] text-center">Drag and drop files here or browse</p>
              </div>
              <button type="button" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f0f4] text-[#111118] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Browse Files</span>
              </button>
            </div>
          </div>

          <h3 className="text-[#111118] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Team Information</h3>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] text-base font-medium leading-normal pb-2">Team Name</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] focus:outline-0 focus:ring-0 border border-[#dcdce5] bg-white focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] text-base font-medium leading-normal pb-2">Team Members</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] focus:outline-0 focus:ring-0 border border-[#dcdce5] bg-white focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
              />
            </label>
          </div>

          <h3 className="text-[#111118] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Submission Status</h3>
          <div className="p-4">
            <div
              className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-lg pt-[132px]"
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhZRYNj3wD8o3PaVxENhPjVO468aTocYrJ3I_rMXspKEMj8us7hhulbfJ5ePzWrrNyZGR5BvCyF_5Rka-f7h8L4GcZnEcgPphD1ffneRQastDR2PCwqb4D2GGnqCY8oqHwhqkAeEQNyref9rWh6sYOolyYpHKHznt5toIV-MZCQd58z3ghiMxHEfcHHIfuYER-ry6wi6M6XXQJNsuXK4cXdJRh_CQ9-50NVl5LBTjQ-ybOQw_Mf7r2UBnNWBCCEKvEdYEGYyAh-w")' }}
            >
              <div className="flex w-full items-end justify-between gap-4 p-4">
                <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                  <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">Deadline: 24 hours left</p>
                  <p className="text-white text-base font-medium leading-normal">You can edit your submission until the deadline.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div
              className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-lg pt-[132px]"
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAD5p98ZquY0JcNR6gbbB7m-umOu7D4fXE-BxMLToLgB3w-PjJ8m9N1jhx4B79WZyhO8cA3wkVXGdhieM_jgEpgfaX0whD-L-N9oAMLaF8448Qvz7voS-Sm7CGMYdwaOAdbr-PkP9KwYWcRNvrcQ66e84v4SNoDfrJY8wpt8_mtomLWDbswmkxFCbpnn-HkZtZSisLrOBQHUFX6GRqnXbvKyaQEgREBfrlxIsEr2bmrzzWY4mH8qTIEdDJJqFU3RCsfOHM55Ad9Q")' }}
            >
              <div className="flex w-full items-end justify-between gap-4 p-4">
                <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                  <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">Submission Successful!</p>
                  <p className="text-white text-base font-medium leading-normal">You have successfully submitted your project. You can edit your submission until the deadline.</p>
                </div>
              </div>
            </div>
          </div>

          {error && <div className="px-4 text-red-500">{error}</div>}
          {message && <div className="px-4 text-green-600">{message}</div>}
          <div className="flex px-4 py-3 justify-end">
            <button disabled={loading} type="submit" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#686aed] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-60">
              <span className="truncate">{loading ? 'Submitting...' : 'Submit'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
