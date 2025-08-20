import api from "./client";

export async function fetchUserRegistrations(userId) {
  const res = await api.get(`/registrations/user/${userId}`);
  return res.data;
}

export async function fetchEventRegistrations(eventId) {
  const res = await api.get(`/registrations/event/${eventId}`);
  return res.data;
}


