import { defaultEventPic } from "@assets/index";
import ConfirmationPopup from "@components/ConfirmationPopup";
import { PhotoCamera } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { pushNotification } from "@redux/slices/loadingSlice";
import { getEventDetailsById } from "@services/eventsService";
import { AppRouteQueries } from "@utils/AppRoutes";
import { CONSTANTS } from "@utils/constants";
import { handleNotification } from "@utils/dispatchNotification";
import { isTokenExpired } from "@utils/tokenUtils";
import { Event, NotificationTypes } from "@utils/types";
import "cropperjs/dist/cropper.css";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Cropper from "react-cropper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  onStart: (values: any) => void;
  loading: boolean;
  availableTags: string[];
  availableHosts: string[];
  selectedEvent: Event | undefined | null;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  onSave,
  onStart,
  loading,
  availableTags,
  availableHosts,
  selectedEvent,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [cropper, setCropper] = useState<any>(null);
  const [openCropperModal, setOpenCropperModal] = useState(false);
  const [eventDetails, setEventDetails] = useState<any>();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: selectedEvent?.title || "",
      description: selectedEvent?.description || "",
      hosts: selectedEvent?.hosts || [],
      scheduledTime: selectedEvent?.scheduledTime || "",
      tags: selectedEvent?.tags || [],
      photoUrl: selectedEvent?.photoUrl || "",
      duration: selectedEvent?.duration || "",
      password: selectedEvent?.password || "",
    },
    validationSchema: Yup?.object({
      title: Yup?.string().required("Title is required"),
      scheduledTime: Yup?.string().required("Scheduled Time is required"),
      tags: Yup?.array()
        .of(Yup?.string())
        .min(1, "At least one tag is required")
        .required("Hosts field is required"),
      hosts: Yup?.array()
        .of(Yup?.string())
        .min(1, "Host is required")
        .max(1, "Only 1 host is required")
        .required("Hosts field is required"),
      duration: Yup.number()
        .required("Duration is required")
        .positive("Duration must be a positive number")
        .test(
          "is-multiple-of-0.5",
          "Duration must be in increments of 0.5",
          (value) => value === undefined || value % 0.5 === 0
        ),
      password: Yup?.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        ...selectedEvent,
        ...values,
      };
      formik.resetForm();
      onSave(payload);
    },
    enableReinitialize: true,
  });

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e?.target?.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader?.result as string);
        setOpenCropperModal(true);
      };
      reader?.readAsDataURL(e?.target?.files[0]);
    }
  };

  // Handle Cropper Modal
  const handleCloseCropper = () => setOpenCropperModal(false);

  const handleApplyCrop = () => {
    if (cropper) {
      const croppedImage = cropper?.getCroppedCanvas().toDataURL();
      formik?.setFieldValue("photoUrl", croppedImage);
    }
    handleCloseCropper();
  };

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((prev) => !prev);
  };

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  const handleCloseCheck = () => {
    if (formik.dirty) {
      toggleConfirmationModal();
      return;
    }
    handleClose();
  };

  const fetchEventDetails = async () => {
    if (!selectedEvent) return;
    if (!isTokenExpired()) {
      try {
        const fetchEventResponse = await getEventDetailsById(selectedEvent?.id);
        if (fetchEventResponse?.success) {
          setEventDetails(fetchEventResponse?.data || null);
        } else {
          dispatch(
            pushNotification({
              isOpen: true,
              message:
                fetchEventResponse?.message ||
                CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_FETCH_FAILURE,
              type: NotificationTypes?.ERROR,
            })
          );
        }
      } catch (error: any) {
        handleNotification(
          dispatch,
          error,
          CONSTANTS?.API_RESPONSE_MESSAGES?.EVENT_FETCH_FAILURE
        );
      }
      return;
    }
    navigate(AppRouteQueries?.AUTH_LOGIN);
  };
  useEffect(() => {
    fetchEventDetails();
  }, [selectedEvent]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleCloseCheck();
      }}
      disableAutoFocus
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          width: "80%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <ConfirmationPopup
          open={isConfirmationModalOpen}
          onClose={toggleConfirmationModal}
          onConfirm={() => {
            handleClose();
            toggleConfirmationModal();
          }}
          title={
            "Unsaved changes will be lost. Are you sure you want to close?"
          }
        />
        <Typography variant="h6" gutterBottom>
          Create Event
        </Typography>
        <form onSubmit={formik?.handleSubmit}>
          {/* Image Upload Section */}
          <Box sx={{ marginBottom: 2, position: "relative" }}>
            <Box
              component={"img"}
              src={formik?.values?.photoUrl || defaultEventPic}
              alt="Event"
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                background: theme?.palette?.background?.default,
                padding: 2,
                borderRadius: "50%",
                boxShadow: 2,
                "&:hover": {
                  background: theme?.palette?.background?.default,
                  transform: "scale(1.1)",
                },
              }}
              color="primary"
              onClick={() =>
                document?.getElementById("icon-button-file")?.click()
              }
            >
              <PhotoCamera />
            </IconButton>
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>

          {/* Title Field */}
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            {...formik?.getFieldProps("title")}
            error={formik?.touched?.title && Boolean(formik?.errors?.title)}
            helperText={formik?.touched?.title && formik?.errors?.title}
          />

          {/* Description Field */}
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            {...formik?.getFieldProps("description")}
          />

          {/* Hosts Autocomplete */}
          <Autocomplete
            multiple
            fullWidth
            options={availableHosts}
            getOptionLabel={(option) => option}
            value={formik?.values?.hosts}
            onChange={(event, newValue) =>
              formik?.setFieldValue("hosts", newValue.slice(0, 1) || [])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hosts"
                variant="outlined"
                margin="normal"
                error={formik.touched.hosts && Boolean(formik.errors.hosts)}
                helperText={formik.touched.hosts && formik.errors.hosts}
              />
            )}
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            disabled={Boolean(selectedEvent)}
          />

          {/* Scheduled Time Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Scheduled Time"
              value={
                formik?.values?.scheduledTime
                  ? new Date(formik?.values?.scheduledTime)
                  : null
              }
              onChange={(newValue) =>
                formik?.setFieldValue(
                  "scheduledTime",
                  newValue?.toISOString() || ""
                )
              }
              sx={{ width: "100%", mt: 1 }}
              slotProps={{
                textField: {
                  error: Boolean(
                    formik?.touched?.scheduledTime &&
                      formik?.errors?.scheduledTime
                  ),
                  helperText:
                    formik?.touched?.scheduledTime &&
                    formik?.errors?.scheduledTime,
                  fullWidth: true,
                  disabled: true,
                },
                actionBar: {
                  actions: ["clear", "accept"],
                },
              }}
            />
          </LocalizationProvider>

          {/* Tags Autocomplete */}
          <Autocomplete
            multiple
            fullWidth
            options={availableTags}
            getOptionLabel={(option) => option}
            value={formik?.values?.tags}
            onChange={(event, newValue) =>
              formik?.setFieldValue("tags", newValue || [])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                variant="outlined"
                margin="normal"
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
              />
            )}
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
          />

          <TextField
            fullWidth
            label="Event Duration"
            variant="outlined"
            placeholder="In Hours"
            margin="normal"
            type="number"
            slotProps={{
              input: {
                inputProps: {
                  step: 0.5,
                  min: 0,
                },
              },
            }}
            {...formik.getFieldProps("duration")}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Join Password"
            variant="outlined"
            margin="normal"
            {...formik?.getFieldProps("password")}
            error={
              formik?.touched?.password && Boolean(formik?.errors?.password)
            }
            helperText={formik?.touched?.password && formik?.errors?.password}
          />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => onStart(formik?.values)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Start Event"}
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Save Event"}
            </Button>
          </Box>
        </form>

        {/* Cropper Modal */}
        <Modal
          open={openCropperModal}
          onClose={handleCloseCropper}
          disableAutoFocus
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 2,
              borderRadius: 2,
              width: "80%",
              maxWidth: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Crop Image
            </Typography>
            {image && (
              <Cropper
                src={image}
                style={{ width: "100%", height: 400 }}
                initialAspectRatio={16 / 9}
                aspectRatio={16 / 9}
                guides={false}
                onInitialized={(instance) => setCropper(instance)}
              />
            )}
            <Box
              sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleCloseCropper}
                sx={{ marginRight: 2 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleApplyCrop}
              >
                Apply Crop
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Modal>
  );
};

export default AddEventModal;
