import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  CircularProgress,
  IconButton,
  Autocomplete,
  Chip,
  useTheme,
  FormHelperText,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  onStart: (values: any) => void;
  loading: boolean;
  availableTags: string[];
  availableHosts: string[];
  availableParticipants: string[]; // New prop for available participants
  defaultEventPic: string;
  emptyBinPic: string;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  onSave,
  onStart,
  loading,
  availableTags,
  availableHosts,
  availableParticipants, // Access available participants
  defaultEventPic,
  emptyBinPic,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [cropper, setCropper] = useState<any>(null);
  const [openCropperModal, setOpenCropperModal] = useState(false);
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      hosts: [],
      scheduledTime: "",
      tags: [],
      enrollList: [], // Add enrollList to initialValues
      photoUrl: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      scheduledTime: Yup.string().required("Scheduled Time is required"),
      tags: Yup.array().of(Yup.string()).min(1, "At least one tag is required"),
      hosts: Yup.array()
        .of(Yup.string())
        .min(1, "At least one host is required"),
      enrollList: Yup.array(),
    }),
    onSubmit: (values) => {
      onSave(values);
    },
  });

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setOpenCropperModal(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handle Cropper Modal
  const handleCloseCropper = () => setOpenCropperModal(false);

  const handleApplyCrop = () => {
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      formik.setFieldValue("photoUrl", croppedImage);
    }
    handleCloseCropper();
  };

  return (
    <Modal open={open} onClose={onClose} disableAutoFocus>
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
          maxHeight: "90vh", // Limit the height of the modal
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create Event
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/* Image Upload Section */}
          <Box sx={{ marginBottom: 2, position: "relative" }}>
            <Box
              component={"img"}
              src={formik.values.photoUrl || defaultEventPic}
              alt="Event"
              style={{
                width: "100%",
                height: "200px",
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
                background: theme.palette.background.default,
                padding: 2,
                borderRadius: "50%",
                boxShadow: 2,
                "&:hover": {
                  background: theme.palette.background.default,
                  transform: "scale(1.1)",
                },
              }}
              color="primary"
              onClick={() =>
                document.getElementById("icon-button-file")?.click()
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
            {...formik.getFieldProps("title")}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          {/* Description Field */}
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            {...formik.getFieldProps("description")}
          />

          {/* Hosts Autocomplete */}
          <Autocomplete
            multiple
            fullWidth
            options={availableHosts}
            getOptionLabel={(option) => option}
            value={formik.values.hosts}
            onChange={(event, newValue) =>
              formik.setFieldValue("hosts", newValue || [])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hosts"
                variant="outlined"
                margin="normal"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
          />

          {/* Scheduled Time Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Scheduled Time"
              value={
                formik.values.scheduledTime
                  ? new Date(formik.values.scheduledTime)
                  : null
              }
              onChange={(newValue) =>
                formik.setFieldValue(
                  "scheduledTime",
                  newValue?.toISOString() || ""
                )
              }
              sx={{ width: "100%", mt: 1 }}
              slotProps={{
                textField: {
                  error: Boolean(
                    formik.touched.scheduledTime && formik.errors.scheduledTime
                  ),
                  helperText:
                    formik.touched.scheduledTime && formik.errors.scheduledTime,
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
            value={formik.values.tags}
            onChange={(event, newValue) =>
              formik.setFieldValue("tags", newValue || [])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                variant="outlined"
                margin="normal"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
          {/* Enroll List (Autocomplete for participants) */}
          <Autocomplete
            multiple
            fullWidth
            options={availableParticipants} // Use the available participants here
            getOptionLabel={(option) => option}
            value={formik.values.enrollList}
            onChange={(event, newValue) =>
              formik.setFieldValue("enrollList", newValue || [])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enroll List (Participants)"
                variant="outlined"
                margin="normal"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
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
              onClick={() => onStart(formik.values)}
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
