import api from "./client";

export async function fetchEvents() {
  const res = await api.get("/events");
  return res.data;
}

export async function fetchEventById(eventId) {
  const res = await api.get(`/events/${eventId}`);
  return res.data;
}

export async function createEventAsOrganizer(payload) {
  const res = await api.post("/events/create-as-organizer", payload);
  return res.data;
}

export async function fetchMyOrganizedEvents() {
  const res = await api.get("/events/my-organized");
  return res.data;
}

export async function checkOrganizerStatus() {
  const res = await api.get("/events/organizer-status");
  return res.data; // { isOrganizer: boolean }
}


