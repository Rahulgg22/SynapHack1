import api from "./client";

export async function fetchAnnouncementsByEvent(eventId) {
  const res = await api.get(`/announcements/event/${eventId}`);
  return res.data;
}

export async function createAnnouncement(payload) {
  const res = await api.post(`/announcements`, payload);
  return res.data;
}


