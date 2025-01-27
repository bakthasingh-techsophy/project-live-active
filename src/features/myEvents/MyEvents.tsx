import ExploreEvents from "@features/common/ExploreEvents";
import { Event } from "@utils/types";

interface MyEventProps {
  sectionPath: string;
}
const MyEvents = ({ sectionPath }: MyEventProps) => {
  return (
    <>
      <ExploreEvents
        page={sectionPath}
        viewMode={"explore"}
        selectedTags={[]}
        searchText={""}
        handleEditEvent={function (event: Event): void {
          throw new Error("Function not implemented.");
        }}
        selectedEvent={undefined}
        setSelectedEvent={function (event: Event | undefined | null): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default MyEvents;
