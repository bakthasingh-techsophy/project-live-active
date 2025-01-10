import { Box, Typography } from "@mui/material";

const MyProgress = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgb(234, 255, 210,0.5) 0%, rgb(245, 253, 238,0.5) 33%, rgb(252, 253, 243,0.5) 66%, rgb(255, 255, 255) 100%)",
      }}
    >
      <Typography sx={{ textAlign: "center", py: 33 }}>
        My Progress Page
      </Typography>
    </Box>
  );
};

export default MyProgress;
