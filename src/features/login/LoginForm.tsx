import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const staticStyles = {
  container: {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 3,
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
  typography: {
    h1: { fontWeight: 700 },
  },
  button: { submitButton: { marginTop: 2 } },
  divider: { marginBottom: 2 },
};

// Validation schema for Login form
const mobileRegex = /^[0-9]{10}$/;

const LoginFormSchema = Yup.object({
  loginAsset: Yup.string()
    .test("is-valid", "Invalid Mobile Number", (value: any) => {
      return mobileRegex?.test(value);
    })
    .required("Mobile Number is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      loginAsset: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle login logic here
    },
  });

  return (
    <Box sx={staticStyles?.container?.mainContainer}>
      <Typography variant="h6" component="h2" sx={staticStyles?.typography?.h1}>
        Login
      </Typography>

      <Divider sx={staticStyles?.divider} />

      <form onSubmit={formik?.handleSubmit}>
        <Box sx={staticStyles?.container?.form}>
          <TextField
            label="Mobile Number"
            name="loginAsset"
            variant="outlined"
            fullWidth
            value={formik?.values?.loginAsset}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.loginAsset && Boolean(formik?.errors?.loginAsset)
            }
            helperText={
              formik?.touched?.loginAsset && formik?.errors?.loginAsset
            }
          />

          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            type="password"
            value={formik?.values?.password}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.password && Boolean(formik?.errors?.password)
            }
            helperText={formik?.touched?.password && formik?.errors?.password}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={staticStyles?.button?.submitButton}
            type="submit"
            disabled={formik?.isSubmitting}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
