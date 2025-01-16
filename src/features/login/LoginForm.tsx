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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginFormSchema = Yup.object({
  loginAsset: Yup.string()
    .test("is-valid", "Invalid Email", (value: any) => {
      return emailRegex?.test(value);
    })
    .required("Email is required"),
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
      <form onSubmit={formik?.handleSubmit}>
        <Box sx={staticStyles?.container?.form}>
          <TextField
            label="Email"
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
