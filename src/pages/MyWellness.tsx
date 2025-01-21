import PreferencePrograms from "@features/myWellness/PreferencePrograms";
import QuickLinks from "@features/myWellness/QuickLinks";
import WellnessHeader from "@features/myWellness/WellnessHeader";
import { Box } from "@mui/material";
import QuoteSection from "@features/myWellness/QuoteSection";

const MyWellness = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgb(210, 245, 255) 0%, rgb(238, 253, 248) 33%, rgb(246, 253, 243) 66%, rgb(255, 255, 255) 100%)",
        minHeight: "80vh",
      }}
    >
      <WellnessHeader />
      <QuickLinks />
      <PreferencePrograms />
      <QuoteSection />
    </Box>
  );
};

export default MyWellness;
