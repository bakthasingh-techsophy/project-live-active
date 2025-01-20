import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { postLoginForm } from "@services/userAuthService";
import { AppRoutes } from "@utils/AppRoutes";
import { CONSTANTS } from "@utils/constants";
import { setLocalStorageItem } from "@utils/encrypt";
import { NotificationTypes } from "@utils/types";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";

const staticStyles = {
  container: {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      borderRadius: 2,
      padding: 1,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      gap: 2,
    },
  },

  button: { submitButton: { marginY: 1 } },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginFormSchema = Yup.object({
  email: Yup.string()
    .test("is-valid", "Invalid Email", (value: any) => {
      return emailRegex?.test(value);
    })
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface LoginFormProps {
  setOpen: any;
}

const LoginForm = ({ setOpen }: LoginFormProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (payload: any, values: any) => {
    try {
      setIsLoading(true);

      const postFormResponse = await postLoginForm(payload);

      if (postFormResponse?.success) {
        setIsLoading(false);
        await setLocalStorageItem(
          CONSTANTS?.ACCESS_TOKEN,
          postFormResponse?.data?.substring(7)
        );
        await setLocalStorageItem(CONSTANTS?.USER_EMAIL, values?.email);
        await dispatch(
          pushNotification({
            isOpen: true,
            message:
              postFormResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.LOGIN_SUCCESS,
            type: NotificationTypes.SUCCESS,
          })
        );
        setOpen(false);
        formik?.resetForm();
        navigate(`${AppRoutes?.DASHBOARD}`);
      } else {
        setIsLoading(false);

        dispatch(
          pushNotification({
            isOpen: true,
            message:
              postFormResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.LOGIN_FAILURE,
            type: NotificationTypes.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS.API_RESPONSE_MESSAGES.LOGIN_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: (values) => {
      const payload = {
        username: values?.email,
        password: values?.password,
      };

      handleSubmit(payload, values);
    },
  });

  return (
    <Box sx={staticStyles?.container?.mainContainer}>
      <form onSubmit={formik?.handleSubmit}>
        <Box sx={staticStyles?.container?.form}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            value={formik?.values?.email}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched?.email && Boolean(formik?.errors?.email)}
            helperText={formik?.touched?.email && formik?.errors?.email}
          />

          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={formik?.values?.password}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.password && Boolean(formik?.errors?.password)
            }
            helperText={formik?.touched?.password && formik?.errors?.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={staticStyles?.button?.submitButton}
            type="submit"
          >
            {isLoading ? (
              <ClipLoader color={"#fff"} loading={isLoading} size={24} />
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
