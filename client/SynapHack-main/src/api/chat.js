import api from "./client";

export async function fetchMessagesByEvent(eventId) {
  const res = await api.get(`/chat/event/${eventId}`);
  return res.data;
}

export async function sendMessage(payload) {
  const res = await api.post(`/chat`, payload);
  return res.data;
}


