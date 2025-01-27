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
export const AppRoutes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  WELLNESS: "/wellness",
  BROWSE_EVENTS: "/browse-events",
  COACHES_AND_NUTRITION: "/coaches-nutrition",
  PROGRESS: "/progress",
  OTHERS: "*",
};

export const AppSubRoutes = {
  EXPLORE_EVENTS: "/" + AppRouteQueryValues.EXPLORE_EVENTS,
  ADMIN: "/" + AppRouteQueryValues.ADMIN,
  MY_EVENTS: "/" + AppRouteQueryValues.MY_EVENTS,
  PAST: "/" + AppRouteQueryValues.PAST,
  PROFILE: "/" + AppRouteQueryValues.PROFILE,
  DETAILS: "/" + AppRouteQueryValues.DETAILS,
  PREFERENCES: "/" + AppRouteQueryValues.PREFERENCES,
  UPCOMING: "/" + AppRouteQueryValues.UPCOMING,
};

export const AppRouteQueries = {
  AUTH_LOGIN: "?auth=login",
  AUTH_REGISTER: "?auth=register",
  USER_SETTINGS_PREFERENCES: "?user-settings=preferences",
  DASHBOARD_EXPLORE_EVENTS: AppRoutes?.DASHBOARD + "?page=explore-events",
  DASHBOARD_PROFILE: AppRoutes?.DASHBOARD + "?page=profile",
  DASHBOARD_SETTINGS: AppRoutes?.DASHBOARD + "?page=settings",
  ADMIN_EVENT_SEARCH: AppRoutes?.DASHBOARD + AppSubRoutes.ADMIN + "?event=",
  EVENT_SEARCH: "?event=",
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

export const AppSubRouteCombinations = {
  MY_EVENTS_PAST: AppSubRoutes.MY_EVENTS + AppSubRoutes?.PAST,
  PROFILE_DETAILS: AppSubRoutes?.PROFILE + AppSubRoutes?.DETAILS,
  PROFILE_PREFERENCES: AppSubRoutes?.PROFILE + AppSubRoutes?.PREFERENCES,
  MY_EVENTS_UPCOMMING: AppSubRoutes?.MY_EVENTS + AppSubRoutes?.UPCOMING,
};
