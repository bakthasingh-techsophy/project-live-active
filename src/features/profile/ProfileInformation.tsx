import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { phoneNumberRegex } from "@utils/constants";

interface ProfileInformationProps {
  subHeading: any;
}

const validationSchema = (countryRegex: any) => {
  return Yup.object({
    fullName: Yup.string()
      .required("Full Name is required")
      .min(2, "Full Name must be at least 2 characters"),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(countryRegex, "Please Enter Valid Phone Number"),
    emailAddress: Yup.string()
      .required("Email Address is required")
      .email("Invalid Email Address"),
    gender: Yup.string().required("Gender is required"),
    city: Yup.string().required("City is required"),
  });
};

const ProfileInformation = ({ subHeading }: ProfileInformationProps) => {
  const theme = useTheme();
  const [countryCode] = useState("in");
  const [countryRegex] = useState(
    phoneNumberRegex[countryCode as keyof typeof phoneNumberRegex]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Account Details</Typography>
        <ChevronRightIcon />
        <Typography variant="h6" color={theme.palette.primary.main}>
          {subHeading}
        </Typography>
      </Box>
      <Box id="formBox">
        <Formik
          initialValues={{
            fullName: "",
            mobileNumber: "",
            emailAddress: "",
            gender: "",
            city: "",
          }}
          validationSchema={validationSchema(countryRegex)}
          onSubmit={(values) => {
            console.log("Form Values:", values);
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: {
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    },
                  }}
                >
                  <TextField
                    name="fullName"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                    sx={{ flex: "1" }}
                  />

                  <TextField
                    name="mobileNumber"
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                    sx={{ flex: "1" }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: {
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    },
                  }}
                >
                  <TextField
                    name="emailAddress"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.emailAddress && Boolean(errors.emailAddress)}
                    helperText={touched.emailAddress && errors.emailAddress}
                    sx={{ flex: "1" }}
                  />

                  <TextField
                    select
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                    sx={{ flex: "1" }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
