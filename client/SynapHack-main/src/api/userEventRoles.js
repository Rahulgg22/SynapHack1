import api from "./client";

export async function fetchMyPendingInvites() {
  const res = await api.get(`/user-event-roles/me/pending`);
  return res.data;
}

export async function acceptInvite(event_id) {
  const userId = localStorage.getItem("userId");
  const res = await api.post(`/user-event-roles/accept`, { user_id: Number(userId), event_id: Number(event_id) });
  return res.data;
}


