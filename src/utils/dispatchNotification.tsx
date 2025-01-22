import { AppDispatch } from "@redux/store";
import { ApiResponse, NotificationTypes } from "./types";
import { pushNotification } from "@redux/slices/loadingSlice";

export function handleResponseMessage(
  enrollFormResponse: ApiResponse,
  dispatch: AppDispatch,
  customSuccessMessage: any,
  customFailureMessage: any
) {
  if (enrollFormResponse?.success) {
    dispatch(
      pushNotification({
        isOpen: true,
        message: enrollFormResponse?.message || customSuccessMessage,
        type: NotificationTypes.SUCCESS,
      })
    );
  } else {
    dispatch(
      pushNotification({
        isOpen: true,
        message: enrollFormResponse?.message || customFailureMessage,
        type: NotificationTypes.ERROR,
      })
    );
  }
}

export function handleNotification(
  dispatch: AppDispatch,
  error: any,
  customMessage: any
) {
  dispatch(
    pushNotification({
      isOpen: true,
      message: error?.message || customMessage,
      type: NotificationTypes.ERROR,
    })
  );
}
