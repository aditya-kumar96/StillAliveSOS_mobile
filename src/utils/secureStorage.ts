import * as Keychain from "react-native-keychain";

const TOKEN_KEY = "stillalive_token";

export async function saveToken(token: string) {
  await Keychain.setGenericPassword(TOKEN_KEY, token, {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
  });
}

export async function getToken(): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return credentials.password;
  }
  return null;
}

export async function clearToken() {
  await Keychain.resetGenericPassword();
}
