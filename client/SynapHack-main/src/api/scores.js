import api from "./client";

export async function fetchScoresByEvent(eventId) {
  const res = await api.get(`/scores/event/${eventId}`);
  return res.data;
}


