import { backgroundPic1 } from "@assets/index";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthFormModalProps {
  open: boolean;
  setOpen: any;
}

const AuthFormModal = ({ open, setOpen }: AuthFormModalProps) => {
  const theme = useTheme();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleClose = () => setOpen(false);

  // Toggle between login and register form
  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={(e: any) => e.preventDefault()}
        disableAutoFocus
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              lg: "60%",
              sm: "60%",
              md: "60%",
              xs: "95%",
            },
            height: "85%",
            bgcolor: "background.paper",
            boxShadow: 24,
            display: "flex",
            flexDirection: "row",
            borderRadius: 2,
            overflow: "auto",
            borderColor: theme.palette.primary.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <IconButton onClick={handleClose} color="primary">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              backgroundImage: `url(${backgroundPic1})`, // Random image for example
              backgroundSize: "cover",
              backgroundPosition: "left",
              display: {
                lg: "block",
                md: "none",
                sm: "none",
                xs: "none",
              },
            }}
          />

          {/* Right side: login/register form */}
          <Box
            sx={{
              width: {
                lg: "50%",
                md: "100%",
                sm: "100%",
                xs: "100%",
              },
              padding: {
                lg: 4,
                md: 6,
                sm: 6,
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {/* Form content */}
            {isRegistering ? <RegisterForm /> : <LoginForm />}

            {/* Register toggle button */}
            <Box
              sx={{
                alignSelf: "flex-end",
                textTransform: "none",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: 1,
                pr: 4,
                mb: {
                  lg: 3,
                  md: 3,
                  sm: 3,
                  xs: 3,
                },
              }}
            >
              <Typography
                sx={{
                  display: "inline-block",
                  fontSize: "0.9rem",
                }}
              >
                {isRegistering
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>
              <Typography
                onClick={toggleForm}
                color="primary"
                sx={{
                  display: "inline-block",
                  fontSize: "0.9rem",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {isRegistering ? "Login" : "Register"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthFormModal;
