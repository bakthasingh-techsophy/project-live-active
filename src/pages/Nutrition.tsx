import CoachesSection from "@features/coachNutrition/CoachesSection";
import CustomizeNutrition from "@features/coachNutrition/CustomizeNutrition";
import HeaderSection from "@features/coachNutrition/HeaderSection";
import NutritionFaqSection from "@features/coachNutrition/NutritionFaqSection";
import { Box } from "@mui/material";

const Nutrition = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgb(255, 221, 235) 0%, rgb(255, 229, 250) 33%, rgb(249, 235, 255) 66%, rgb(255, 255, 255) 100%)",
      }}
    >
      <HeaderSection />
      <CustomizeNutrition />
      <CoachesSection />
      <NutritionFaqSection />
    </Box>
  );
};

export default Nutrition;
