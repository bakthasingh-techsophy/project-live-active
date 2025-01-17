import UserPreferencesModal from "@features/UserPreferencesModal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { phoneNumberRegex } from "@utils/constants";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface ProfileInformationProps {
  subHeading: any;
}

const staticStyles = {
  container: {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    formBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 2,
    },
    headingContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    submitButtonContainer: {
      display: "flex",
      justifyContent: "flex-start",
      mt: 2,
    },
    modalButton: {
      mt: 4,
    },
    rowDirection: {
      display: "flex",
      gap: 2,
    },
  },
  textField: {
    fullWidth: true,
    flex: "1",
  },
};

const dynamicStyles = {
  container: {
    rowDirection: {
      display: "flex",
      gap: 2,
      flexDirection: {
        lg: "row",
        md: "row",
        sm: "column",
        xs: "column",
      },
    },
  },
};

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
  const [countryCode] = useState("in");
  const [countryRegex] = useState(
    phoneNumberRegex[countryCode as keyof typeof phoneNumberRegex]
  );

  return (
    <Box sx={staticStyles?.container?.mainContainer}>
      {/* Header Section */}
      <Box sx={staticStyles?.container?.headingContainer}>
        <Typography variant="h6">Account Details</Typography>
        <ChevronRightIcon />
        <Typography variant="h6" color={"primary.main"}>
          {subHeading}
        </Typography>
      </Box>

      {/* Form Section */}
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
              <Box sx={staticStyles?.container?.formBox}>
                <Box
                  sx={[
                    staticStyles?.container?.rowDirection,
                    dynamicStyles?.container?.rowDirection,
                  ]}
                >
                  <TextField
                    name="fullName"
                    label="Full Name"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.fullName && Boolean(errors?.fullName)}
                    helperText={touched?.fullName && errors?.fullName}
                    sx={staticStyles?.textField}
                  />
                  <TextField
                    name="mobileNumber"
                    label="Mobile Number"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched?.mobileNumber && Boolean(errors?.mobileNumber)
                    }
                    helperText={touched?.mobileNumber && errors?.mobileNumber}
                    sx={staticStyles?.textField}
                  />
                </Box>

                <Box
                  sx={[
                    staticStyles?.container?.rowDirection,
                    dynamicStyles?.container?.rowDirection,
                  ]}
                >
                  <TextField
                    name="emailAddress"
                    label="Email Address"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched?.emailAddress && Boolean(errors?.emailAddress)
                    }
                    helperText={touched?.emailAddress && errors?.emailAddress}
                    sx={staticStyles?.textField}
                  />
                  <TextField
                    select
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.gender && Boolean(errors?.gender)}
                    helperText={touched?.gender && errors?.gender}
                    sx={staticStyles?.textField}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box sx={staticStyles?.container?.submitButtonContainer}>
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
