import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { postRegisterForm } from "@services/userAuthService";
import { CONSTANTS } from "@utils/constants";
import { NotificationTypes } from "@utils/types";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

// Validation schema for Register form
const mobileRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterFormSchema = Yup.object({
  mobileNumber: Yup.string()
    .test("is-valid", "Invalid Mobile Number", (value: any) => {
      return mobileRegex?.test(value);
    })
    .required("Mobile Number is required"),
  email: Yup.string()
    .test("is-valid", "Invalid Email", (value: any) => {
      return emailRegex?.test(value);
    })
    .required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Password Mismatch"),
});

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

interface RegisterFormProps {
  toggleForm: any;
}

const RegisterForm = ({ toggleForm }: RegisterFormProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (payload: any) => {
    try {
      setIsLoading(true);

      const postFormResponse = await postRegisterForm(payload);

      if (postFormResponse?.success) {
        setIsLoading(false);

        await dispatch(
          pushNotification({
            isOpen: true,
            message: CONSTANTS.API_RESPONSE_MESSAGES.REGISTRATION_SUCCESS,
            type: NotificationTypes.SUCCESS,
          })
        );
        await toggleForm();
        formik?.resetForm();
      } else {
        setIsLoading(false);

        dispatch(
          pushNotification({
            isOpen: true,
            message:
              postFormResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.REGISTRATION_FAILURE,
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
          message: CONSTANTS.API_RESPONSE_MESSAGES.REGISTRATION_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      email: "",
      firstName: "",
      lastName: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: (values) => {
      const payload = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        mobileNumber: values?.mobileNumber,
        emailId: values?.email,
        password: values?.confirmPassword,
      };

      handleSubmit(payload);
    },
  });

  return (
    <Box sx={staticStyles?.container?.mainContainer}>
      <form onSubmit={formik?.handleSubmit}>
        <Box sx={staticStyles?.container?.form}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                variant="outlined"
                fullWidth
                value={formik?.values?.firstName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                error={
                  formik?.touched?.firstName &&
                  Boolean(formik?.errors?.firstName)
                }
                helperText={
                  formik?.touched?.firstName && formik?.errors?.firstName
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                variant="outlined"
                fullWidth
                value={formik?.values?.lastName}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                error={
                  formik?.touched?.lastName && Boolean(formik?.errors?.lastName)
                }
                helperText={
                  formik?.touched?.lastName && formik?.errors?.lastName
                }
              />
            </Grid>
          </Grid>

          <TextField
            label="Mobile Number"
            name="mobileNumber"
            variant="outlined"
            fullWidth
            value={formik?.values?.mobileNumber}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.mobileNumber &&
              Boolean(formik?.errors?.mobileNumber)
            }
            helperText={
              formik?.touched?.mobileNumber && formik?.errors?.mobileNumber
            }
          />
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
            label="New Password"
            name="newPassword"
            variant="outlined"
            fullWidth
            type="password"
            value={formik?.values?.newPassword}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.newPassword &&
              Boolean(formik?.errors?.newPassword)
            }
            helperText={
              formik?.touched?.newPassword && formik?.errors?.newPassword
            }
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            fullWidth
            type="password"
            value={formik?.values?.confirmPassword}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.confirmPassword &&
              Boolean(formik?.errors?.confirmPassword)
            }
            helperText={
              formik?.touched?.confirmPassword &&
              formik?.errors?.confirmPassword
            }
          />
          <Button
            variant="contained"
            color="primary"
            sx={staticStyles?.button?.submitButton}
            type="submit"
          >
            {isLoading ? (
              <ClipLoader color={"#fff"} loading={isLoading} size={24} />
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;
