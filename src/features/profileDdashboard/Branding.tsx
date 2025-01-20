import { laLogo } from "@assets/index";
import { Box } from "@mui/material";
import { Branding } from "@toolpad/core/AppProvider";

export const LiveActiveBrand: Branding = {
    title: "Live Active",
    logo: (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          component={"img"}
          src={laLogo}
          sx={{
            width: "40px",
            alignSelf: "center",
            justifySelf: "center",
          }}
        />
      </Box>
    ),
    homeUrl: "/",
  };