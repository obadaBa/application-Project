// src/domain/user/useCases/loginUser.js
import { loginApi } from "../../../data/user/userApi";

export async function loginUser(username, password) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const result = await loginApi({ username, password });

  return {
    token: result.token,
    user: result.user,
  };
}
