// src/data/user/userApi.js
import { httpClient } from "../http/client";

export async function loginApi({ username, password }) {
  const { data } = await httpClient.post("/auth/login", {
    username,
    password,
  });

  return data;
}
