import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface UserPreferencesProps {
  subHeading: any;
}

const staticStyles = {
  container: {
    mainContainer: { display: "flex", flexDirection: "column", gap: 4 },
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

  return (
    <Box sx={staticStyles?.container?.mainContainer}>
      <Box sx={staticStyles?.container?.headerContainer}>
        <Typography variant="h6">Settings</Typography>
        <ChevronRightIcon />
        <Typography variant="h6" color={"primary.main"}>
          {subHeading}
        </Typography>
      </Box>
      <Box id="formBox">
        <Formik
          initialValues={{
            preferences: {
              gymAndWellness: false,
              yoga: false,
              meditation: false,
              nutrition: false,
              equipment: false,
            },
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Values:", values);
          }}
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
                          checked={values?.preferences?.gymAndWellness}
                          onChange={handleChange}
                          name="preferences.gymAndWellness"
                        />
                      }
                      label="Gym and Wellness"
                    />
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

export default UserPreferences;
