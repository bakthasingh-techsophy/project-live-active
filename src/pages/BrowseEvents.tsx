import BrowseEventsComponent from "@features/browseEvents/BrowseEventsComponent";
import Options from "@features/browseEvents/Options";
import TagsDisplay from "@features/browseEvents/TagsRow";

const BrowseEvents = () => {
  return (
    <>
      <Options />
      <TagsDisplay />
      <BrowseEventsComponent />
    </>
  );
};

export default BrowseEvents;
