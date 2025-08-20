import api from "./client";

export async function createSubmission(payload) {
  const res = await api.post("/submissions", payload);
  return res.data;
}

export async function fetchSubmissionsByEvent(eventId) {
  const res = await api.get(`/submissions/event/${eventId}`);
  return res.data;
}


