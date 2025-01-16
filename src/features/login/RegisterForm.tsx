import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
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

const RegisterForm: React.FC = () => {
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
      console.log(values);
      // Handle submit logic here
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
            disabled={formik?.isSubmitting}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;
