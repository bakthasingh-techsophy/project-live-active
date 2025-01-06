import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

// Validation schema for Login form
const mobileRegex = /^[0-9]{10}$/;

const LoginFormSchema = Yup.object({
  loginAsset: Yup.string()
    .test("is-valid", "Invalid Mobile Number", (value: any) => {
      return mobileRegex.test(value);
    })
    .required("Mobile Number is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  // const theme = useTheme();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        borderRadius: 2,
      }}
    >
      {/* Heading */}
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
        Login
      </Typography>

      {/* Divider */}
      <Divider sx={{ marginBottom: 2 }} />

      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 2,
          }}
        >
          {/* Mobile Number Field */}
          <TextField
            label="Mobile Number"
            name="loginAsset"
            variant="outlined"
            fullWidth
            value={formik.values.loginAsset}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.loginAsset && Boolean(formik.errors.loginAsset)
            }
            helperText={formik.touched.loginAsset && formik.errors.loginAsset}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            type="submit"
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
