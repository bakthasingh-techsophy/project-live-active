import { getSessionStorageItem } from "@utils/encrypt";
import { request } from "./request";

interface ResponseProps {
  success: boolean;
  data?: Blob;
  message?: string;
}

export const getFunction = async (): Promise<{
  success: boolean;
  data?: any;
  message?: string;
}> => {
  const gatewayUrl = getSessionStorageItem("GATE_WAY_URL");
  const endpoint = `${gatewayUrl}${"BACKEND_ENDPOINT"}}`;

  try {
    const response = await request.get(endpoint);
    return response as { success: boolean; data?: any; message?: string };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error Message" };
  }
};

export const postFunction = async (
  payload: object
): Promise<{
  success: boolean;
  data?: any;
  message?: string;
}> => {
  const gatewayUrl = getSessionStorageItem("GATE_WAY_URL");
  const endpoint = `${gatewayUrl}${"BACKEND_ENDPOINT"}`;

  try {
    const response = (await request.post(endpoint, payload)) as ResponseProps;

    if (response.success) {
      const form = response.data as any;
      return {
        success: response.success,
        data: form,
        message: response.message,
      };
    }

    return { success: false, message: response.message };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error Message" };
  }
};
