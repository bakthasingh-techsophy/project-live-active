import { ApiResponse } from "@utils/types";
import wretch from "wretch";

export const searchEvents = async (
  payload: object
): Promise<ApiResponse> => {
  const gatewayUrl = "http://localhost:8080/api/live-active";
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
