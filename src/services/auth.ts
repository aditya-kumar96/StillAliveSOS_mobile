import { apiFetch } from "./api";
import { saveToken } from "../utils/secureStorage";

export async function requestOtp(phone: string) {
  return apiFetch("/auth/request_otp", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

export async function verifyOtp(phone: string, otp: string) {
  const res = await apiFetch("/auth/verify_otp", {
    method: "POST",
    body: JSON.stringify({ phone, otp }),
  });

  await saveToken(res.access_token);
  return res;
}
