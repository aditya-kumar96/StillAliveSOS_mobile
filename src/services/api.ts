import { getToken } from "../utils/secureStorage";

const BASE_URL = "http://10.0.2.2:8000";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = await getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const err = await response.json();
    throw err;
  }

  return response.json();
}
