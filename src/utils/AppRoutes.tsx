const SLASH = "/";
export const AppRoutes = {
  HOME: SLASH,
  DASHBOARD: "/dashboard",
  WELLNESS: "/wellness",
  BROWSE_EVENTS: "/browse-events",
  COACHES_AND_NUTRITION: "/coaches-nutrition",
  PROGRESS: "/progress",
  OTHERS: "*",
};
export const AppRouteQueryValues = {
  LOGIN: "login",
  REGISTER: "register",
  PREFERENCES: "preferences",
  EXPLORE_EVENTS: "explore-events",
  MY_EVENTS: "my-events",
  PROFILE: "profile",
  DETAILS: "details",
  UPCOMING: "upcoming",
  PAST: "past",
  SETTINGS: "settings",
  ADMIN: "admin",
};
export const AppRoutesCombination = {
  DASHBOARD_EXPLORE_EVENTS: AppRoutes?.DASHBOARD + "/explore-events",
  DASHBOARD_ADMIN: AppRoutes?.DASHBOARD + "/admin",
};
export const AppRouteQueryParams = {
  AUTH: "auth",
  USER_SETTINGS: "user-settings",
  PAGE: "page",
};

export const AppRouteQueries = {
  AUTH_LOGIN: "?auth=login",
  AUTH_REGISTER: "?auth=register",
  USER_SETTINGS_PREFERENCES: "?user-settings=preferences",
  DASHBOARD_EXPLORE_EVENTS: AppRoutes?.DASHBOARD + "?page=explore-events",
  DASHBOARD_PROFILE: AppRoutes?.DASHBOARD + "?page=profile",
  DASHBOARD_SETTINGS: AppRoutes?.DASHBOARD + "?page=settings",
  DASHBOARD_MY_EVENTS_UPCOMMING:
    SLASH +
    AppRouteQueryValues?.MY_EVENTS +
    SLASH +
    AppRouteQueryValues?.UPCOMING,
};
