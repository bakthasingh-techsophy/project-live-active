import Options from "@features/browseEvents/Options";
import TagsDisplay from "@features/browseEvents/TagsRow";
import ExploreEvents from "@features/common/ExploreEvents";
import { Box } from "@mui/material";

const BrowseEvents = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgb(228, 255, 248) 0%, rgb(241, 255, 250) 3%, rgb(246, 253, 243) 6%, rgb(255, 255, 255) 100%)",
      }}
    >
      <Options />
      <TagsDisplay />
      {/* <BrowseEventsComponent /> */}
      <ExploreEvents viewMode="browse" />
    </Box>
  );
};

export default BrowseEvents;
