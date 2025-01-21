import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled, useTheme } from "@mui/material/styles";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { profilePic } from "@assets/index";
import { updateUser } from "@services/userManagementService";
import { pushNotification } from "@redux/slices/loadingSlice";
import { CONSTANTS } from "@utils/constants";
import { NotificationTypes } from "@utils/types";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

const styles = {
  mainContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
const ImagePicker = ({ userDetails }: { userDetails: any }) => {
  const inputRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleWrapperClick(inputRef: any) {
    inputRef.current.click();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
      setIsDialogOpen(true);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
      setSelectedImage(null);
      setIsDialogOpen(false);
      console.log("Cropped Image URL:", croppedDataUrl);
    }
  };

  const handleUpload = async () => {
    if (croppedImage) {
      try {
        const payload = {
          photoUrl: croppedImage,
          userName: userDetails?.emailId || "",
          userId: userDetails?.userId || "",
        };
        setIsLoading(true);

        const updateUserResponse = await updateUser(payload);

        if (updateUserResponse?.success) {
          setIsLoading(false);
          dispatch(
            pushNotification({
              isOpen: true,
              message:
                updateUserResponse?.message ||
                CONSTANTS.API_RESPONSE_MESSAGES.UPDATE_DP_SUCCESS,
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
                CONSTANTS.API_RESPONSE_MESSAGES.UPDATE_DP_SUCCESS,
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
            message: CONSTANTS.API_RESPONSE_MESSAGES.UPDATE_DP_SUCCESS,
            type: NotificationTypes.ERROR,
          })
        );
      }
    } else {
      console.warn("No image to upload");
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };

  const ProfileImage = styled(Box)(({ theme }) => ({
    width: 100,
    height: 100,
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: theme.shadows[2],
  }));

  const EditIconWrapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: "50%",
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  }));

  return (
    <Box sx={styles.mainContainer}>
      <ProfileImage>
        <Box
          component="img"
          src={croppedImage || userDetails?.photoUrl || profilePic}
          alt="Profile"
          sx={styles.image}
        />
        <EditIconWrapper onClick={() => handleWrapperClick(inputRef)}>
          <IconButton
            component="label"
            sx={{
              color: theme?.palette?.primary?.contrastText,
            }}
          >
            <EditIcon />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputRef}
            onChange={handleFileChange}
          />
        </EditIconWrapper>
        ;
      </ProfileImage>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Crop Your Image
          </Typography>
          {selectedImage && (
            <Cropper
              src={selectedImage}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1}
              guides={false}
              ref={cropperRef}
              viewMode={1}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCrop} variant="contained" color="primary">
            Crop
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!croppedImage}
        sx={{ mt: 2 }}
      >
        {isLoading ? (
          <ClipLoader color={"#fff"} loading={isLoading} size={24} />
        ) : (
          "Upload Image"
        )}
      </Button>
    </Box>
  );
};

export default ImagePicker;
