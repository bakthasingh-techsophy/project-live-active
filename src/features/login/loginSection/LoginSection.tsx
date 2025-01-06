import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import LoginForm from "./forms/LoginForm";
import { getLocalStorageItem } from "@utils/encrypt";
import { HOME_CONSTANTS } from "../LoginConstants";
import RegisterForm from "./forms/RegisterForm";
import { CONSTANTS } from "@utils/constants";
import { useSelector } from "react-redux";

const styles = {
  container: {
    userLoginContainer: {
      width: "100%",
      minHeight: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
    },
    formContainer: {
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",

      "@media (max-width: 840px)": {
        minHeight: "80vh",
      },
    },
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      opacity: 1,
      transition: "transform 0.6s ease-in-out, opacity 0.6s ease-in-out",
    },
    addFieldContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      opacity: 1,
      transition: "transform 0.6s ease-in-out, opacity 0.6s ease-in-out",
      transformOrigin: "center",
    },
  },
  typography: {
    loginHeader: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#344054",
      textAlign: "left",
      alignSelf: "center",
      "@media (max-width: 840px)": {
        fontSize: "0.8rem",
        textAlign: "center",
      },
    },
  },
};

const LoginSection = () => {
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);
  const isUserFieldMissing =
    getLocalStorageItem(CONSTANTS.USER_FIELD_MISSING) === CONSTANTS.TRUE;
  const tokenChecked = useSelector((state: any) => state.tokenChecked);
  const [isLoginVisible, setIsLoginVisible] = useState(!isUserFieldMissing);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  useEffect(() => {
    if (isUserFieldMissing) {
      setIsLoginVisible(false);
    }
  }, [isUserFieldMissing]);

  useEffect(() => {
    const token = getLocalStorageItem(CONSTANTS.ACCESS_TOKEN);
    if (tokenChecked) {
      if (isLoggedIn && token) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    }
  }, [isLoggedIn, tokenChecked]);

  return (
    <Box sx={styles?.container?.formContainer}>
      {isUserLoggedIn ? (
        <>
          <Typography sx={styles?.typography?.loginHeader}>
            {HOME_CONSTANTS?.LOGGED_IN_MESSAGE}
          </Typography>
        </>
      ) : (
        <>
          {isLoginVisible ? (
            <LoginForm handleToggle={handleToggle} />
          ) : (
            <RegisterForm handleToggle={handleToggle} />
          )}
        </>
      )}
    </Box>
  );
};

export default LoginSection;
