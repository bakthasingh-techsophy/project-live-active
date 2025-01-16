import wretch, { Wretch, WretchError, WretchResponseChain } from 'wretch';
import { CONSTANTS } from '@utils/constants';
import { getSessionStorageItem } from '@utils/encrypt';

export interface ResponseProps {
  success?: boolean;
  data?: unknown;
  message?: string;
}

type ApiResponse = unknown;

const callAPI = async (w: WretchResponseChain<ApiResponse>): Promise<ApiResponse> => {
  return w
    .error(401, () => {
      window.location.reload();
      return { success: false, message: 'Please login...' };
    })
    .error(500, (error: WretchError) => {
      const message = error.json?.()?.message || 'Internal server error';
      return { success: false, message };
    })
    .json((response) => response)
    .catch((error: WretchError) => {
      console.error(error);
      return { success: false, message: 'Error communicating with server' };
    });
};

const callBlobAPI = async (wr: WretchResponseChain<ApiResponse>): Promise<ApiResponse> => {
  return wr
    .error(401, () => {
      window.location.reload();
      return { success: false, message: 'Please login again...' };
    })
    .blob((response) => {
      return { success: true, data: response };
    })
    .catch((error: WretchError) => {
      console.error(error);
      return { success: false, message: 'Error communicating with server' };
    });
};

export const request = {
  get: (url: string): Promise<ApiResponse> =>
    callAPI(
      wretch(url)
        .auth(`Bearer ${getSessionStorageItem(CONSTANTS?.REACT_TOKEN)}`)
        .headers({ 'Content-Type': 'application/json' })
        .get()
    ),

  getBlob: (url: string): Promise<ApiResponse> =>
    callBlobAPI(
      wretch(url)
        .auth(`Bearer ${getSessionStorageItem(CONSTANTS?.REACT_TOKEN)}`)
        .get()
    ),

  post: (url: string, body: object): Promise<ApiResponse> =>
    callAPI(
      wretch(url)
        .auth(`Bearer ${getSessionStorageItem(CONSTANTS?.REACT_TOKEN)}`)
        .json(body)
        .post()
    ),

  put: (url: string, body: object): Promise<ApiResponse> =>
    callAPI(
      wretch(url)
        .auth(`Bearer ${getSessionStorageItem(CONSTANTS?.REACT_TOKEN)}`)
        .json(body)
        .put()
    ),

  delete: (url: string): Promise<ApiResponse> =>
    callAPI(
      wretch(url)
        .auth(`Bearer ${getSessionStorageItem(CONSTANTS?.REACT_TOKEN)}`)
        .delete()
    ),

  postFormForToken: (
    url: string,
    params: Record<string, string>,
    controller?: AbortController
  ): Promise<ApiResponse> =>
    callAPI(
      wretch(url)
        .headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        .body(new URLSearchParams(params)) // Use URLSearchParams for form URL encoding
        .post()
    ),

  postForm: (
    url: string,
    params: FormData,
    controller?: AbortController
  ): Promise<ApiResponse> =>
    callAPI(
      wretch(url)
        .auth(`Bearer ${getSessionStorageItem(CONSTANTS?.REACT_TOKEN)}`)
        .body(params) // Use FormData directly
        .post()
    ),
};
