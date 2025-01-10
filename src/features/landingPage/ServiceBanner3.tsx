import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";

interface ServiceBanner3Props {
  backgroundImage: string;
}
const staticStyles = {
  container: {},
  typography: {
    header: (theme: any) => ({
      fontWeight: 900,
      color: theme?.palette?.primary?.main,
    }),
  },
  button: {
    joinButton: (theme: any) => ({
      padding: "12px 24px",
      fontWeight: "bold",
      borderRadius: "8px",
      textTransform: "none",
      whiteSpace: "nowrap",
      background: theme?.palette?.secondary?.main,
      "&:hover": {
        background: theme?.palette?.secondary?.dark,
      },
    }),
  },
};
const dynamicStyles = {
  container: {},
  typography: {},
  button: {
    joinButton: {
      fontSize: {
        xs: "0.9rem",
        sm: "1rem",
      },
    },
  },
};
const ServiceBanner3 = ({ backgroundImage }: ServiceBanner3Props) => {
  const theme = useTheme();

  return (
    <Banner
      backgroundImage={backgroundImage}
      heading={
        <>
          <span style={staticStyles?.typography?.header(theme)}>
            Join Group Classes
          </span>
          <br />
          For fun and motivation together!
        </>
      }
      tagline="Stay motivated and enjoy a fun workout experience with live group classes led by expert trainers."
      actionButtons={
        <>
          <Button
            variant="contained"
            color="primary"
            sx={[
              staticStyles?.button?.joinButton(theme),
              dynamicStyles?.button?.joinButton,
            ]}
            endIcon={<ChevronRightIcon />}
            // onClick={handleExploreClick}
          >
            Join Now
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner3;
