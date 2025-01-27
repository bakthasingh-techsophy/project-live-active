import ExploreEvents from "@features/common/ExploreEvents";
import { pushNotification } from "@redux/slices/loadingSlice";
import { searchEvents } from "@services/eventsService";
import { CONSTANTS } from "@utils/constants";
import { Event, NotificationTypes } from "@utils/types";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface MyEventProps {
  sectionPath: string;
}
const MyEvents = ({ sectionPath }: MyEventProps) => {
  // const [loading, setLoading] = useState(false);
  // const [allEvents, setAllEvents] = useState<Event[]>([]);
  // const dispatch = useDispatch();

  // const handleSearch = async (payload: any) => {
  //   try {
  //     setLoading(true);

  //     const searchFormResponse = await searchEvents(payload);

  //     if (searchFormResponse?.success) {
  //       setLoading(false);
  //       setAllEvents(searchFormResponse?.data);
  //     } else {
  //       setLoading(false);
  //       dispatch(
  //         pushNotification({
  //           isOpen: true,
  //           message:
  //             searchFormResponse?.message ||
  //             CONSTANTS?.API_RESPONSE_MESSAGES?.EVENTS_FETCH_FAILURE,
  //           type: NotificationTypes?.ERROR,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //     dispatch(
  //       pushNotification({
  //         isOpen: true,
  //         message: CONSTANTS?.API_RESPONSE_MESSAGES?.EVENTS_FETCH_FAILURE,
  //         type: NotificationTypes?.ERROR,
  //       })
  //     );
  //   }
  // };
  console.log("pagehere 1", sectionPath);

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
