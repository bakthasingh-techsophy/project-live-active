import { profilePic } from "@assets/index";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { getUserDetails, updateUser } from "@services/userManagementService";
import { CONSTANTS, mobileRegex } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { NotificationTypes } from "@utils/types";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
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
      gap: 2,
      px: 1,
    },
    userInfoContainer: {
      display: "flex",
      flexDirection: "column",
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
    profileImage: {
      width: 80,
      height: 80,
      maxWidth: 400,
      borderRadius: 500,
      boxShadow: 1,
      objectFit: "cover",
    },
  },
  typography: {
    greetHeader: {
      textTransform: "uppercase",
    },
    textField: {
      fullWidth: true,
      flex: "1",
    },
    nameText: {
      textTransform: "capitalize",
      fontWeight: 600,
      cursor: "pointer",
    },
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

const validationSchema = () => {
  return Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 1 character"),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(mobileRegex, "Please Enter Valid Phone Number"),
    userName: Yup.string()
      .required("Email Address is required")
      .email("Invalid Email Address"),
    gender: Yup.string().required("Gender is required"),
    userId: Yup.string().required("User ID is required"),
  });
};

const ProfileInformation = ({ subHeading }: ProfileInformationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const dispatch = useDispatch();
  const currentDate = new Date();
  const timeInIST = currentDate?.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const currentHour = new Date(timeInIST).getHours();

  let greeting = "";
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      const updateUserResponse = await updateUser(values);

      if (updateUserResponse?.success) {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              updateUserResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.UPDATE_USER_SUCCESS,
            type: NotificationTypes.SUCCESS,
          })
        );
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              updateUserResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.UPDATE_USER_FAILURE,
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
          message: CONSTANTS.API_RESPONSE_MESSAGES.UPDATE_USER_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  const fetchUserDetails = async () => {
    const userId = getLocalStorageItem(CONSTANTS.USER_ID);
    try {
      setIsLoading(true);

      const getUserResponse = await getUserDetails(userId || "");
      if (getUserResponse?.success) {
        setIsLoading(false);
        setUserDetails(getUserResponse?.data);
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              getUserResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
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
          message: CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Box sx={staticStyles?.container?.mainContainer}>
      <Box sx={staticStyles?.container?.headingContainer}>
        <Box
          component="img"
          sx={staticStyles?.container?.profileImage}
          src={userDetails?.photoUrl || profilePic}
          alt="Random Image"
        />
        <Box sx={staticStyles?.container?.userInfoContainer}>
          <Typography
            variant="body2"
            sx={staticStyles?.typography?.greetHeader}
          >
            Hi 👋, {greeting}
          </Typography>
          <Typography sx={staticStyles?.typography?.nameText}>
            {userDetails?.firstName} {userDetails?.lastName}
          </Typography>
        </Box>
      </Box>
      {/* Header Section */}
      <Box sx={staticStyles?.container?.headingContainer}>
        <Typography variant="h6" color={"primary.main"}>
          {subHeading}
        </Typography>
      </Box>

      {/* Form Section */}
      <Box id="formBox">
        <Formik
          initialValues={{
            firstName: userDetails?.firstName || "--",
            lastName: userDetails?.lastName || "",
            mobileNumber: userDetails?.mobileNumber || "",
            userName: userDetails?.emailId || "",
            gender: userDetails?.gender || "",
            userId: userDetails?.userId || "",
          }}
          validationSchema={validationSchema()}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          enableReinitialize={true}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <Box sx={staticStyles?.container?.formBox}>
                <Box
                  sx={[
                    staticStyles?.container?.rowDirection,
                    dynamicStyles?.container?.rowDirection,
                  ]}
                >
                  <TextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.firstName && Boolean(errors?.firstName)}
                    helperText={
                      touched?.firstName &&
                      typeof errors?.firstName === "string"
                        ? errors?.firstName
                        : ""
                    }
                    sx={staticStyles?.typography?.textField}
                    disabled={isLoading}
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.lastName && Boolean(errors?.lastName)}
                    helperText={
                      touched?.lastName && typeof errors?.lastName === "string"
                        ? errors?.lastName
                        : ""
                    }
                    sx={staticStyles?.typography?.textField}
                    disabled={isLoading}
                  />
                </Box>

                <Box
                  sx={[
                    staticStyles?.container?.rowDirection,
                    dynamicStyles?.container?.rowDirection,
                  ]}
                >
                  <TextField
                    name="mobileNumber"
                    label="Mobile Number"
                    variant="outlined"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched?.mobileNumber && Boolean(errors?.mobileNumber)
                    }
                    helperText={
                      touched?.mobileNumber &&
                      typeof errors?.mobileNumber === "string"
                        ? errors?.mobileNumber
                        : ""
                    }
                    sx={staticStyles?.typography?.textField}
                    disabled={isLoading}
                  />
                  <TextField
                    name="userName"
                    label="Email Address"
                    variant="outlined"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.userName && Boolean(errors?.userName)}
                    helperText={
                      touched?.userName && typeof errors?.userName === "string"
                        ? errors?.userName
                        : ""
                    }
                    sx={staticStyles?.typography?.textField}
                    disabled
                  />
                </Box>
                <Box
                  sx={[
                    staticStyles?.container?.rowDirection,
                    dynamicStyles?.container?.rowDirection,
                  ]}
                >
                  <TextField
                    select
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.gender && Boolean(errors?.gender)}
                    helperText={
                      touched?.gender && typeof errors?.gender === "string"
                        ? errors?.gender
                        : ""
                    }
                    sx={staticStyles?.typography?.textField}
                    disabled={isLoading}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                  <TextField
                    name="userId"
                    label="User ID"
                    variant="outlined"
                    value={values.userId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.userId && Boolean(errors?.userId)}
                    helperText={
                      touched?.userId && typeof errors?.userId === "string"
                        ? errors?.userId
                        : ""
                    }
                    sx={staticStyles?.typography?.textField}
                    disabled
                  />
                </Box>
              </Box>

              <Box sx={staticStyles?.container?.submitButtonContainer}>
                <Button type="submit" variant="contained" color="primary">
                  {isLoading ? (
                    <ClipLoader color={"#fff"} loading={isLoading} size={24} />
                  ) : (
                    "Update"
                  )}
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
