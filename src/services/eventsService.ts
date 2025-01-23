import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { ApiResponse, Event } from "@utils/types";
import wretch from "wretch";

const gatewayUrl = "http://localhost:8080/api/live-active";

export const searchEvents = async (payload: object): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events/search`;

  try {
    const response = (await wretch(endpoint)
      .post(payload)
      .json()) as ApiResponse;

    if (response?.success) {
      const form = response?.data as any;
      return {
        success: response?.success,
        data: form,
        message: response?.message,
      };
    }

    return { success: false, message: response?.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const enrollOrJoinEvent = async (
  payload: object,
  eventId: number
): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events/${eventId}/enroll-join`;

  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN)}`,
      })
      .post(payload)
      .json()) as ApiResponse;

    if (response?.success) {
      return {
        success: response?.success,
        data: response?.data,
        message: response?.message,
      };
    }

    return { success: false, message: response?.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};

export const saveEventInDataBase = async (
  payload: object
): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events`;
  const token = getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN);
  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .post(payload)
      .json()) as ApiResponse;

    // Return the response as it is (success and message)
    if (response?.success) {
      return {
        success: response?.success,
        data: response?.data,
        message: response?.message,
      };
    }

    return { success: false, message: response?.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
export const updateEventInDatabase = async (
  eventId: number,
  event: Event
): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events/${eventId}`;
  const token = getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN);
  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .put(event)
      .json()) as ApiResponse;

    // Return the response as it is (success and message)
    if (response?.success) {
      return {
        success: response?.success,
        data: response?.data,
        message: response?.message,
      };
    }

    return { success: false, message: response?.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
export const deleteEvent = async (payload: object): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events/delete`;
  const token = getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN);
  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .post(payload)
      .json()) as ApiResponse;

    // Return the response as it is (success and message)
    if (response?.success) {
      return {
        success: response?.success,
        data: response?.data,
        message: response?.message,
      };
    }

    return { success: false, message: response?.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
export const getEventDetailsById = async (
  evenId: number
): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events/${evenId}/details`;
  const token = getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN);
  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .get()
      .json()) as ApiResponse;

    // Return the response as it is (success and message)
    if (response?.success) {
      return response;
    }

    return { success: false, message: response?.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
export const getEventById = async (evenId: number): Promise<ApiResponse> => {
  const endpoint = `${gatewayUrl}/events/${evenId}`;
  const token = getLocalStorageItem(CONSTANTS?.ACCESS_TOKEN);
  try {
    const response = (await wretch(endpoint)
      .headers({
        Authorization: `Bearer ${token}`,
      })
      .get()
      .json()) as ApiResponse;

    // Return the response as it is (success and message)
    if (response?.success) {
      return response;
    }

    return { success: false, message: response?.message };
  } catch (error: any) {
    const errorMessage = JSON.parse(error?.message)?.message || "Unknown error";

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  }
};
