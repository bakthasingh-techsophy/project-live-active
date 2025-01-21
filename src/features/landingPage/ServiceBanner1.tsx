import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, useTheme } from "@mui/material";
import Banner from "../../components/Banner";
import { staticStyles, dynamicStyles } from "./ServiceCarousel";
import { AppRoutesCombination, AppRoutes } from "@utils/AppRoutes";
import { isTokenExpired } from "@utils/tokenUtils";
import { useNavigate } from "react-router-dom";

interface ServiceBanner1Props {
  backgroundImage: string;
}

const ServiceBanner1 = ({ backgroundImage }: ServiceBanner1Props) => {
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
            Join Live Yoga
          </span>
          <br />
          Find balance with expert guidance
        </>
      }
      tagline="Experience live yoga classes designed to help you find balance, flexibility, and strength with expert instructors."
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
            Join Live
          </Button>
        </>
      }
    />
  );
};

export default ServiceBanner1;
