import PreferencePrograms from "@features/myWellness/PreferencePrograms";
import MyEnrollments from "@features/myWellness/MyEnrollments";
import WellnessHeader from "@features/myWellness/WellnessHeader";
import { Box } from "@mui/material";
import QuoteSection from "@features/myWellness/QuoteSection";
import { pushNotification } from "@redux/slices/loadingSlice";
import { searchEvents } from "@services/eventsService";
import { getUserDetails } from "@services/userManagementService";
import { CONSTANTS } from "@utils/constants";
import { getLocalStorageItem } from "@utils/encrypt";
import { NotificationTypes } from "@utils/types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const MyWellness = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [browsedEvents, setBrowsedEvents] = useState<Event[]>([]);
  const [userDetails, setUserDetails] = useState<any>();

  const handleSearch = async (payload: any) => {
    try {
      setIsLoading(true);

      const searchFormResponse = await searchEvents(payload);

      if (searchFormResponse?.success) {
        setIsLoading(false);
        setBrowsedEvents(searchFormResponse?.data);
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              searchFormResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.EVENTS_FETCH_FAILURE,
            type: NotificationTypes.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS.API_RESPONSE_MESSAGES.EVENTS_FETCH_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  const fetchUserDetails = async () => {
    const userId = getLocalStorageItem(CONSTANTS.USER_ID);
    try {
      setIsLoading(true);

      const getUserResponse = await getUserDetails(userId || "");
      if (getUserResponse?.success) {
        setIsLoading(false);
        setUserDetails(getUserResponse?.data);
      } else {
        setIsLoading(false);
        dispatch(
          pushNotification({
            isOpen: true,
            message:
              getUserResponse?.message ||
              CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
            type: NotificationTypes.ERROR,
          })
        );
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      dispatch(
        pushNotification({
          isOpen: true,
          message: CONSTANTS.API_RESPONSE_MESSAGES.USER_DETAILS_FETCH_FAILURE,
          type: NotificationTypes.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    const payload = {
      searchText: "",
    };
    handleSearch(payload);
    fetchUserDetails();
  }, []);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgb(210, 245, 255) 0%, rgb(238, 253, 248) 33%, rgb(246, 253, 243) 66%, rgb(255, 255, 255) 100%)",
        minHeight: "80vh",
      }}
    >
      <WellnessHeader />
      <MyEnrollments
        isLoading={isLoading}
        browsedEvents={browsedEvents}
        userDetails={userDetails}
      />
      <PreferencePrograms
        isLoading={isLoading}
        browsedEvents={browsedEvents}
        userDetails={userDetails}
      />
      <QuoteSection />
    </Box>
  );
};

export default MyWellness;
