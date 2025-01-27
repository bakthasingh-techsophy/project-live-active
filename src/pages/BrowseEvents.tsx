import Options from "@features/browseEvents/Options";
import TagsDisplay from "@features/browseEvents/TagsRow";
import ExploreEvents from "@features/common/ExploreEvents";
import { Box } from "@mui/material";
import { AppRoutes } from "@utils/AppRoutes";
import { useState } from "react";

const BrowseEvents = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgb(228, 255, 248) 0%, rgb(241, 255, 250) 3%, rgb(246, 253, 243) 6%, rgb(255, 255, 255) 100%)",
        minHeight: "80vh",
      }}
    >
      <Options searchText={searchText} setSearchText={setSearchText} />
      <TagsDisplay
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <ExploreEvents
        page={AppRoutes.BROWSE_EVENTS}
        viewMode="browse"
        selectedTags={selectedTags}
        searchText={searchText}
        handleEditEvent={() => {}}
        selectedEvent={undefined}
        setSelectedEvent={() => {}}
      />
    </Box>
  );
};

export default BrowseEvents;
