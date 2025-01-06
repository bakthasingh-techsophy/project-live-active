import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

// Validation schema for Register form
const mobileRegex = /^[0-9]{10}$/;

const RegisterFormSchema = Yup.object({
  loginAsset: Yup.string()
    .test("is-valid", "Invalid Mobile Number", (value: any) => {
      return mobileRegex.test(value);
    })
    .required("Mobile Number is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.string().required("Age is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Password Mismatch"),
});

const RegisterForm: React.FC = () => {
  // const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      loginAsset: "",
      name: "",
      age: "",
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
        Register
      </Typography>

      {/* Divider */}
      <Divider sx={{ marginBottom: 2 }} />

      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 2,
          }}
        >
          {/* Name Field */}
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            component={"input"}
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size="small"
          />

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

          {/* Age Field */}
          <TextField
            label="Age"
            name="age"
            variant="outlined"
            fullWidth
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />

          {/* Password Field */}
          <TextField
            label="New Password"
            name="newPassword"
            variant="outlined"
            fullWidth
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />

          {/* Confirm Password Field */}
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            fullWidth
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            type="submit"
            disabled={formik.isSubmitting}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;
