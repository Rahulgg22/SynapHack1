import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { checkOrganizerStatus } from "../api/events";
import { fetchMyPendingInvites } from "../api/userEventRoles";

const AuthContext = createContext({ role: "user", setRole: () => {} });

export function AuthProvider({ children }) {
  const [role, setRole] = useState("user");

  useEffect(() => {
    const stored = localStorage.getItem("role");
    if (stored) {
      setRole(stored);
    }
    // Dev helper: allow ?asJudge=1 to simulate judge role
    const params = new URLSearchParams(window.location.search);
    if (params.get("asJudge") === "1") {
      setRole("judge");
      localStorage.setItem("role", "judge");
    }
  }, []);

  useEffect(() => {
    // Update role to organizer if backend indicates so (requires token)
    const token = localStorage.getItem("token");
    if (!token) return;
    (async () => {
      try {
        const res = await checkOrganizerStatus();
        if (res?.isOrganizer) {
          setRole("organizer");
          localStorage.setItem("role", "organizer");
        }
        // If not organizer, and has pending judge invites, keep role user until acceptance
        // This block can later be extended to auto elevate upon acceptance action
        const invites = await fetchMyPendingInvites();
        if (!res?.isOrganizer && Array.isArray(invites) && invites.length > 0) {
          // We keep role as user until they accept, but we could surface a UI badge.
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  const value = useMemo(() => ({ role, setRole }), [role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


