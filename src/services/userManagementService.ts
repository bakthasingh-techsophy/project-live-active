import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { ApiResponse } from "@utils/types";
import wretch from "wretch";

export const getUserDetails = async (userId: string): Promise<ApiResponse> => {
  const gatewayUrl = "http://localhost:8080/api/live-active";
  const endpoint = `${gatewayUrl}/users/${userId}`;

  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN)}`,
      })
      .get()
      .json()) as ApiResponse;

    if (response.success) {
      const form = response.data as any;
      return {
        success: response.success,
        data: form,
        message: response.message,
      };
    }

    return { success: false, message: response.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const updateUser = async (payload: object): Promise<ApiResponse> => {
  const gatewayUrl = "http://localhost:8080/api/live-active";
  const endpoint = `${gatewayUrl}/users`;

  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN)}`,
      })
      .put(payload)
      .json()) as ApiResponse;

    if (response.success) {
      const form = response.data as any;
      return {
        success: response.success,
        data: form,
        message: response.message,
      };
    }

    return { success: false, message: response.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
    };
  }
};
