import { Box, Typography } from "@mui/material";

const Nutrition = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgb(255, 210, 229,0.5) 0%, rgb(253, 238, 250) 33%, rgb(248, 243, 253) 66%, rgb(255, 255, 255) 100%)",
      }}
    >
      <Typography sx={{ textAlign: "center", py: 33 }}>
        Coaches and Nutrition Page
      </Typography>
    </Box>
  );
};

export default Nutrition;
