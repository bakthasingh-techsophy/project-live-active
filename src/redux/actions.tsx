export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const LOADER = "LOADER";

export const pushNotification = (data: any) => {
  return { type: PUSH_NOTIFICATION, payload: data };
};

export const setLoader = (loading: any) => {
  return {
    type: LOADER,
    payload: loading,
  };
};
