// src/redux/slices/loadingSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationProps {
  isOpen: boolean;
  type?: "error" | "info" | "success" | "warning";
  message?: string;
  handleClose?: () => void;
}

interface LoadingState {
  notification: NotificationProps;
  isLoading: boolean;
  isLoggedIn: boolean;
  tokenChecked: boolean;
}

const initialState: LoadingState = {
  notification: { isOpen: false },
  isLoading: false,
  isLoggedIn: false,
  tokenChecked: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<NotificationProps>) => {
      state.notification = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setTokenChecked: (state, action: PayloadAction<boolean>) => {
      state.tokenChecked = action.payload;
    },
  },
});

export const { pushNotification, setLoader, setLoggedIn, setTokenChecked } =
  loadingSlice.actions;

export default loadingSlice.reducer;
