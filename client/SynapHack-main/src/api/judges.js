import api from "./client";

export async function searchUsers(q) {
  const res = await api.get(`/judges/search`, { params: { q } });
  return res.data;
}

export async function inviteJudge({ event_id, user_id }) {
  const res = await api.post(`/judges`, { event_id, user_id, status: 'pending' });
  return res.data;
}


