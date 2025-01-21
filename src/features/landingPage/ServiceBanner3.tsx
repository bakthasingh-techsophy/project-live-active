import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";
import { staticStyles, dynamicStyles } from "./ServiceCarousel";
import { AppRoutesCombination, AppRoutes } from "@utils/AppRoutes";
import { isTokenExpired } from "@utils/tokenUtils";
import { useNavigate } from "react-router-dom";

interface ServiceBanner3Props {
  backgroundImage: string;
}
const ServiceBanner3 = ({ backgroundImage }: ServiceBanner3Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isTokenActive = !isTokenExpired();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

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
              staticStyles?.buttons?.button(theme),
              dynamicStyles?.buttons?.button,
            ]}
            endIcon={<ChevronRightIcon />}
            onClick={() =>
              isTokenActive
                ? handleNavigation(
                    AppRoutesCombination?.DASHBOARD_EXPLORE_EVENTS
                  )
                : handleNavigation(AppRoutes?.BROWSE_EVENTS)
            }
          >
            Join Now
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner3;
