import { backgroundPic1 } from "@assets/index";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRouteQueries, AppRouteQueryValues } from "@utils/AppRoutes";

interface AuthFormModalProps {
  open: boolean;
  handleClose: any;
}

const staticStyles = {
  container: {
    modalBox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "60%",
      bgcolor: "background.paper",
      boxShadow: 24,
      display: "flex",
      flexDirection: "row",
      borderRadius: 2,
      overflow: "auto",
    },

    leftImageBox: {
      height: "100%",
      backgroundImage: `url(${backgroundPic1})`,
      backgroundSize: "cover",
      backgroundPosition: "left",
    },
    toggleBox: {
      alignSelf: "flex-end",
      textTransform: "none",
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
      gap: 1,
      pr: 1,
    },
    formHeaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      formHeader: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
    form: {
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
  },
  typography: {
    h1: { fontWeight: 700 },
    toggleText: {
      display: "inline-block",
      fontSize: "0.9rem",
    },
    toggleLink: {
      display: "inline-block",
      fontSize: "0.9rem",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  divider: { marginY: 2 },
};

const dynamicStyles = {
  container: {
    modalBox: (theme: any) => ({
      width: {
        lg: "55%",
        sm: "60%",
        md: "60%",
        xs: "95%",
      },
      "@media (max-height: 900px)": {
        height: "75%",
      },
      "@media (max-height: 800px)": {
        height: "80%",
      },
      "@media (max-height: 700px)": {
        height: "85%",
      },
      "@media (max-height: 600px)": {
        height: "95%",
      },

      borderColor: theme?.palette?.primary?.main,
    }),
    leftImageBox: {
      display: {
        lg: "block",
        md: "none",
        sm: "none",
        xs: "none",
      },
      width: "50%",
    },
    rightFormBox: {
      width: {
        lg: "50%",
        md: "100%",
        sm: "100%",
        xs: "100%",
      },
      padding: 3,
      maxHeight: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
    toggleBox: {
      mb: {
        lg: 3,
        md: 3,
        sm: 3,
        xs: 3,
      },
    },
  },
};

const AuthFormModal = ({ open, handleClose }: AuthFormModalProps) => {
  const theme = useTheme();
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const currentUrlLocation = useLocation();

  const toggleForm = async () => {
    const param = new URLSearchParams(currentUrlLocation?.search).get("auth");
    const path =
      param === AppRouteQueryValues?.REGISTER
        ? AppRouteQueryValues?.LOGIN
        : AppRouteQueryValues?.REGISTER;
    navigate(`?auth=${path}`);
  };

  useEffect(() => {
    const param = new URLSearchParams(currentUrlLocation?.search).get("auth");
    setIsRegistering(param === AppRouteQueryValues?.REGISTER);
    if (param === AppRouteQueryValues?.LOGIN) {
      navigate(AppRouteQueries?.AUTH_LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrlLocation?.search]);

  return (
    <div>
      <Modal
        open={open}
        onClose={(e: any) => e?.preventDefault()}
        disableAutoFocus
      >
        <Box
          sx={[
            staticStyles?.container?.modalBox,
            dynamicStyles?.container?.modalBox(theme),
          ]}
        >
          <Box
            sx={[
              staticStyles?.container?.leftImageBox,
              dynamicStyles?.container?.leftImageBox,
            ]}
          />
          <Box sx={dynamicStyles?.container?.rightFormBox}>
            <Box sx={staticStyles?.container?.formHeaderContainer}>
              <Box
                sx={staticStyles?.container?.formHeaderContainer?.formHeader}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={staticStyles?.typography?.h1}
                >
                  {isRegistering ? "Register" : "Login"}
                </Typography>
                <IconButton onClick={handleClose} color="primary">
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider sx={staticStyles?.divider} />

            <Box sx={staticStyles?.container?.form}>
              {isRegistering ? (
                <RegisterForm toggleForm={toggleForm} />
              ) : (
                <LoginForm setOpen={handleClose} />
              )}
              <Box
                sx={[
                  staticStyles?.container?.toggleBox,
                  dynamicStyles?.container?.toggleBox,
                ]}
              >
                <Typography sx={staticStyles?.typography?.toggleText}>
                  {isRegistering
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </Typography>
                <Typography
                  onClick={toggleForm}
                  color="primary"
                  sx={staticStyles?.typography?.toggleLink}
                >
                  {isRegistering ? "Login" : "Register"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthFormModal;
