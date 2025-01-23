import { CONSTANTS } from "./constants";
import { getLocalStorageItem } from "./encrypt";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const isTokenExpired = (): boolean => {
  const token = getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN);
  if (!token) return true;

  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (!decoded || !decoded?.exp) return false;
    return decoded?.exp < currentTime;
  } catch (error) {
    console.error(error);
    return true;
  }
};
