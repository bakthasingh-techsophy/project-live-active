import {
  LOADER,
  PUSH_NOTIFICATION,
} from "./actions";


export interface NotificationProps {
  isOpen: boolean;
  type?: "error" | "info" | "success" | "warning";
  message?: string;
  handleClose?: () => void;
}

const initialState: any = {
  notification: {},
  isLoggedIn: false,
  tokenChecked: false,
  isLoading: false,
};

export const loadingActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PUSH_NOTIFICATION:
      return { ...state, notification: action.payload };

    case LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
