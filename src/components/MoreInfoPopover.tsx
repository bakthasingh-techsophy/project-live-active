import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  IconButton,
  Popover
} from "@mui/material";
import React from "react";


interface MoreInfoPopoverProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  items: string[];
  onClose: () => void;
  //   buttonText: string;
}

const MoreInfoPopover: React.FC<MoreInfoPopoverProps> = ({
  open,
  anchorEl,
  items,
  onClose,
  //   buttonText,
}) => {
  console.log("tags here", items);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ padding: 2, maxWidth: 300 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {items.map((item, index) => (
            <Chip
              key={index}
              label={item}
              size="small"
              variant="outlined"
              color="primary"
            />
          ))}
        </Box>
        <Box sx={{ textAlign: "right", marginTop: "8px" }}>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Popover>
  );
};

export default MoreInfoPopover;
