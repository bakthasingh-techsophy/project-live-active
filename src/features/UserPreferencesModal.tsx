import {
  preferencePic2,
  preferencePic3,
  preferencePic4,
  preferencePic5,
} from "@assets/index";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { pushNotification } from "@redux/slices/loadingSlice";
import { getUserDetails, updateUser } from "@services/userManagementService";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { NotificationTypes } from "@utils/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

interface UserPreferencesModalProps {
  open: boolean;
  handleModalClose: any;
}

const preferencesData = [
  {
    id: "yoga",
    title: "Yoga",
    image: preferencePic2,
  },
  {
    id: "meditation",
    title: "Meditation",
    image: preferencePic3,
    imageAlt: "meditation image",
  },
  {
    id: "nutrition",
    title: "Nutrition",
    image: preferencePic4,
    imageAlt: "nutrition image",
  },
  {
    id: "equipment",
    title: "Equipment",
    image: preferencePic5,
    imageAlt: "equipment image",
  },
];

const styles = {
  modalBox: {
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
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    borderRadius: 2,
    overflow: "auto",
    p: 4,
    maxHeight: "90%",
  },
  title: {
    mb: 2,
    textAlign: "center",
    color: "text.secondary",
  },
  cardTitle: { zIndex: 2 },
  alert: {
    mb: 2,
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: "center",
  },
  card: (isSelected: boolean) => ({
    width: {
      lg: "30%",
      md: "30%",
      sm: "40%",
      xs: "100%",
    },
    position: "relative",
    overflow: "hidden",
    borderRadius: 2,
    border: isSelected ? "3px solid primary.main" : "none",
    boxShadow: isSelected ? "0 0 10px 2px rgba(0, 0, 0, 0.2)" : "none",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "transform 0.3s ease-in-out",
    },
  }),
  cardContent: (image: string) => ({
    height: 150,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  }),
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  checkmark: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "50%",
    width: 24,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    color: "#000",
  },
  saveButtonContainer: {
    display: "flex",
    justifyContent: "center",
    mt: 4,
  },
  saveButton: {
    width: "200px",
  },
};

const UserPreferencesModal = ({
  open,
  handleModalClose,
}: UserPreferencesModalProps) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<any>();

  const handleCardClick = (id: string) => {
    setSelectedPreferences((prev) =>
      prev?.includes(id) ? prev?.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const payload = {
      preferences: selectedPreferences,
      userName: getLocalStorageItem(CONSTANTS?.USER_EMAIL),
      userId: getLocalStorageItem(CONSTANTS?.USER_ID),
    };
    setHasAttemptedSave(true);

    if (selectedPreferences?.length < 3) {
      setError("Please select at least 3 preferences.");
    } else {
      setError(null);
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
                CONSTANTS?.API_RESPONSE_MESSAGES?.UPDATE_PREFERENCES_SUCCESS,
              type: NotificationTypes?.SUCCESS,
            })
          );
        } else {
          setIsLoading(false);
          dispatch(
            pushNotification({
              isOpen: true,
              message:
                updateUserResponse?.message ||
                CONSTANTS?.API_RESPONSE_MESSAGES?.UPDATE_PREFERENCES_FAILURE,
              type: NotificationTypes?.ERROR,
            })
          );
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              CONSTANTS?.API_RESPONSE_MESSAGES?.UPDATE_PREFERENCES_FAILURE,
            type: NotificationTypes?.ERROR,
          })
        );
      }
      handleModalClose();
    }
  };

  const fetchUserDetails = async () => {
    const userId = getLocalStorageItem(CONSTANTS?.USER_ID);
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
              CONSTANTS?.API_RESPONSE_MESSAGES?.USER_DETAILS_FETCH_FAILURE,
            type: NotificationTypes?.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS?.API_RESPONSE_MESSAGES?.USER_DETAILS_FETCH_FAILURE,
          type: NotificationTypes?.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDetails?.preferences) {
      setSelectedPreferences(userDetails?.preferences);
    }
  }, [userDetails]);

  useEffect(() => {
    if (hasAttemptedSave && selectedPreferences?.length < 3) {
      setError("Please select at least 3 preferences.");
    } else {
      setError(null);
    }
  }, [selectedPreferences, hasAttemptedSave]);

  return (
    <Modal
      open={open}
      onClose={(e: any) => e?.preventDefault()}
      disableAutoFocus
    >
      <Box sx={styles?.modalBox}>
        <Typography variant="h5" sx={styles?.title}>
          Select Preferences
        </Typography>

        {hasAttemptedSave && error && (
          <Alert severity="error" sx={styles?.alert}>
            {error}
          </Alert>
        )}

        <Box sx={styles?.cardContainer}>
          {preferencesData?.map((preference) => (
            <Card
              key={preference?.id}
              sx={styles?.card(selectedPreferences?.includes(preference?.id))}
            >
              <CardActionArea onClick={() => handleCardClick(preference?.id)}>
                <CardContent sx={styles?.cardContent(preference?.image)}>
                  <Box sx={styles?.overlay} />
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={styles?.cardTitle}
                  >
                    {preference?.title}
                  </Typography>
                  {selectedPreferences?.includes(preference?.id) && (
                    <Box sx={styles?.checkmark}>✓</Box>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Box sx={styles?.saveButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={styles?.saveButton}
          >
            {isLoading ? (
              <ClipLoader color={"#fff"} loading={isLoading} size={24} />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserPreferencesModal;
