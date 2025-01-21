import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { ApiResponse } from "@utils/types";
import wretch from "wretch";

const gatewayUrl = "http://localhost:8080/api/live-active";

export const searchEvents = async (payload: object): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events/search`;

  try {
    const response = (await wretch(endpoint)
      .post(payload)
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

export const saveEventInDataBase = async (
  payload: object
): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events`;
  const token = getLocalStorageItem(CONSTANTS.ACCESS_TOKEN);
  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .post(payload)
      .json()) as ApiResponse;

    // Return the response as it is (success and message)
    if (response.success) {
      return {
        success: response.success,
        data: response.data,
        message: response.message,
      };
    }

    return { success: false, message: response.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
