import api from "./client";

export async function loginUser({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function registerUser({ name, email, password, university, organization }) {
  const res = await api.post("/auth/register", { name, email, password, university, organization });
  return res.data;
}


