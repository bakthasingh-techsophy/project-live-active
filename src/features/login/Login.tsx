import { Box } from "@mui/material";
import WelcomeSection from "./loginSection/WelcomeSection";
import LoginSection from "./loginSection/LoginSection";
import { backgroundPic1 } from "@assets/index";

const styles = {
  container: {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      width: "100%",

      "@media (max-width: 840px)": {
        flexDirection: "column",
        justifyContent: "start",
      },
    },
    halfContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      width: "100%",
      flex: 1,
      position: "relative",
    },
  },
};

const Login = () => {
  return (
    <Box sx={styles?.container?.mainContainer}>
      <Box sx={styles?.container?.halfContainer}>
        {/* <Box
          component={"img"}
          src={backgroundPic1}
          sx={{
            height: "100%",
            width: "100%",
          }}
        /> */}
      </Box>
      <Box sx={styles?.container?.halfContainer}>
        <LoginSection />
      </Box>
    </Box>
  );
};

export default Login;
