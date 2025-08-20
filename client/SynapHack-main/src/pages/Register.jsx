// Layout is handled in App.jsx
import React, { useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [teamChoice, setTeamChoice] = useState("create");
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [inviteMembers, setInviteMembers] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      setLoading(true);
      const payload = {
        event: Number(eventId) || undefined,
        teamName,
        fullName,
        email,
        organization,
        role,
        graduationYear,
        teamDescription,
        inviteMembers: inviteMembers.split(",").map((s) => s.trim()).filter(Boolean),
      };
      await api.post("/registrations", payload);
      setMessage("Registered successfully.");
      try {
        localStorage.setItem(`registered_event_${eventId}`, "1");
      } catch {}
      setTimeout(()=> navigate(`/events/${eventId}/live`), 800);
    } catch (e) {
      setError(e?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const radioDotSvgLight = "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(17,17,24)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')";
  const radioDotSvgDark = "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(255,255,255)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')";

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-40 flex justify-center py-5" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif', ['--radio-dot-svg-light']: radioDotSvgLight, ['--radio-dot-svg-dark']: radioDotSvgDark }}>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between"><p className="text-[#111118] dark:text-white text-base font-medium leading-normal">Step 1 of 4</p></div>
          <div className="rounded bg-[#dcdce5] dark:bg-[#2a2a30]"><div className="h-2 rounded bg-[#686aed] dark:bg-[#686aed]" style={{ width: '25%' }}></div></div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111118] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Complete your registration</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Personal Details</h3>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Full Name</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Email</p>
              <input
                type="email"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">School/Organization</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your school/organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Major/Role</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter your major/role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Graduation Year</p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                placeholder="YYYY"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
              />
            </label>
          </div>

          <h3 className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Team Selection</h3>
          <div className="flex flex-col gap-3 p-4">
            <label className="flex items-center gap-4 rounded-lg border border-solid border-[#dcdce5] dark:border-[#2a2a30] p-[15px] w-full">
              <input
                type="radio"
                className="h-5 w-5 border-2 border-[#dcdce5] dark:border-[#2a2a30] bg-transparent text-transparent checked:border-[#111118] dark:checked:border-white checked:bg-[image:var(--radio-dot-svg-light)] dark:checked:bg-[image:var(--radio-dot-svg-dark)] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#111118] dark:checked:focus:border-white"
                name="team-choice"
                checked={teamChoice === 'create'}
                onChange={() => setTeamChoice('create')}
              />
              <div className="flex grow flex-col"><p className="text-[#111118] dark:text-white text-sm font-medium leading-normal">Create a Team</p></div>
            </label>
            <label className="flex items-center gap-4 rounded-lg border border-solid border-[#dcdce5] dark:border-[#2a2a30] p-[15px] w-full">
              <input
                type="radio"
                className="h-5 w-5 border-2 border-[#dcdce5] dark:border-[#2a2a30] bg-transparent text-transparent checked:border-[#111118] dark:checked:border-white checked:bg-[image:var(--radio-dot-svg-light)] dark:checked:bg-[image:var(--radio-dot-svg-dark)] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#111118] dark:checked:focus:border-white"
                name="team-choice"
                checked={teamChoice === 'join'}
                onChange={() => setTeamChoice('join')}
              />
              <div className="flex grow flex-col"><p className="text-[#111118] dark:text-white text-sm font-medium leading-normal">Join a Team</p></div>
            </label>
          </div>

          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Team Name</p>
              <input
                placeholder="Enter team name"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Team Description</p>
              <textarea
                placeholder="Describe your team"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] min-h-36 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
              ></textarea>
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111118] dark:text-white text-base font-medium leading-normal pb-2">Invite Members</p>
              <input
                placeholder="Enter member emails"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111118] dark:text-white focus:outline-0 focus:ring-0 border border-[#dcdce5] dark:border-[#2a2a30] bg-white dark:bg-[#23232b] focus:border-[#dcdce5] h-14 placeholder:text-[#636388] p-[15px] text-base font-normal leading-normal"
                value={inviteMembers}
                onChange={(e) => setInviteMembers(e.target.value)}
              />
            </label>
          </div>

          {error && <div className="px-4 text-red-500">{error}</div>}
          {message && <div className="px-4 text-green-600">{message}</div>}
          <div className="flex px-4 py-3 justify-end">
            <button disabled={loading} type="submit" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#686aed] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-60">
              <span className="truncate">{loading ? 'Submitting...' : 'Next'}</span>
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
