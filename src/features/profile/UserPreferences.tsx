import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { getUserDetails, updateUser } from "@services/userManagementService";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { NotificationTypes } from "@utils/types";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

interface UserPreferencesProps {
  subHeading: any;
}

const staticStyles = {
  container: {
    mainContainer: { display: "flex", flexDirection: "column", gap: 4, p: 3},
    headerContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 2,
    },
    formField: {
      display: "flex",
      gap: 2,
      flexDirection: {
        lg: "row",
        md: "row",
        sm: "column",
        xs: "column",
      },
    },
    submitButtonContainer: {
      display: "flex",
      justifyContent: "flex-start",
      mt: 2,
    },
  },
  typography: {},
  button: {},
};
const dynamicStyles = {
  container: {
    formField: {
      flexDirection: {
        lg: "row",
        md: "row",
        sm: "column",
        xs: "column",
      },
    },
  },
  typography: {},
  button: {},
};

const UserPreferences = ({ subHeading }: UserPreferencesProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();
  const [initialPreferences, setInitialPreferences] = useState<any>({
    yoga: false,
    meditation: false,
    nutrition: false,
    equipment: false,
  });

  const validationSchema = Yup.object().shape({
    preferences: Yup.object().test(
      "at-least-three-selected",
      "At least three preferences must be selected.",
      (preferences) => {
        const selectedCount = Object?.values(preferences || {}).filter(
          (value) => value === true
        ).length;
        return selectedCount >= 3;
      }
    ),
  });

  useEffect(() => {
    const temp = {
      ...initialPreferences,
    };
    if (userDetails?.preferences?.length) {
      userDetails?.preferences?.forEach((preference: string) => {
        if (temp?.hasOwnProperty(preference)) {
          temp[preference] = true;
        }
      });
    }
    setInitialPreferences(temp);
  }, [userDetails]);

  const handleSubmit = async (payload: any) => {
    try {
      setIsLoading(true);

      const updateUserResponse = await updateUser(payload);

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
      <Box sx={staticStyles?.container?.headerContainer}>
        <Typography variant="h6" color={"primary.main"}>
          {subHeading}
        </Typography>
      </Box>
      <Box id="formBox">
        <Formik
          initialValues={{
            preferences: initialPreferences,
          }}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            const payload = {
              preferences: Object.keys(values.preferences)
                .filter((key) => values.preferences[key])
                .map((key) => key),
              userName: getLocalStorageItem(CONSTANTS?.USER_EMAIL),
              userId: getLocalStorageItem(CONSTANTS?.USER_ID),
            };
            handleSubmit(payload);
          }}
          enableReinitialize={true}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Box sx={staticStyles?.container?.form}>
                <Box
                  sx={[
                    staticStyles?.container?.formField,
                    dynamicStyles?.container?.formField,
                  ]}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values?.preferences?.yoga}
                          onChange={handleChange}
                          name="preferences.yoga"
                        />
                      }
                      label="Yoga"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values?.preferences?.meditation}
                          onChange={handleChange}
                          name="preferences.meditation"
                        />
                      }
                      label="Meditation"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values?.preferences?.nutrition}
                          onChange={handleChange}
                          name="preferences.nutrition"
                        />
                      }
                      label="Nutrition"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values?.preferences?.equipment}
                          onChange={handleChange}
                          name="preferences.equipment"
                        />
                      }
                      label="Equipment"
                    />
                  </FormGroup>
                </Box>
                {errors?.preferences &&
                  touched?.preferences &&
                  typeof errors?.preferences === "string" && (
                    <Typography color="error" variant="body2">
                      {errors?.preferences}
                    </Typography>
                  )}
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

export default UserPreferences;
