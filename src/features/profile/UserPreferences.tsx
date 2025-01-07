import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";

interface UserPreferencesProps {
  subHeading: any;
}

const UserPreferences = ({ subHeading }: UserPreferencesProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
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
              yoga: false,
              fitness: false,
              food: false,
              nutrition: false,
              cooking: false,
              wellness: false,
            },
          }}
          onSubmit={(values) => {
            console.log("Form Values:", values);
          }}
        >
          {({ values, handleChange }) => (
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
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.preferences.yoga}
                          onChange={handleChange}
                          name="preferences.yoga"
                        />
                      }
                      label="Yoga"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.preferences.fitness}
                          onChange={handleChange}
                          name="preferences.fitness"
                        />
                      }
                      label="Fitness"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.preferences.food}
                          onChange={handleChange}
                          name="preferences.food"
                        />
                      }
                      label="Food"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.preferences.nutrition}
                          onChange={handleChange}
                          name="preferences.nutrition"
                        />
                      }
                      label="Nutrition"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.preferences.cooking}
                          onChange={handleChange}
                          name="preferences.cooking"
                        />
                      }
                      label="Cooking"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.preferences.wellness}
                          onChange={handleChange}
                          name="preferences.wellness"
                        />
                      }
                      label="Wellness"
                    />
                  </FormGroup>
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

export default UserPreferences;
