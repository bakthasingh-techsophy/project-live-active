export const AppRoutes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  WELLNESS: "/wellness",
  BROWSE_EVENTS: "/browse-events",
  COACHES_AND_NUTRITION: "/coaches-nutrition",
  PROGRESS: "/progress",
  OTHERS: "*",
};
export const AppRoutesCombination = {
  DASHBOARD_EXPLORE_EVENTS: AppRoutes.DASHBOARD + "/explore-events",
};
export const AppRouteQueries = {
  AUTH_LOGIN: "?auth=login",
  AUTH_REGISTER: "?auth=register",
  USER_SETTINGS_PREFERENCES: "?user-settings=preferences",
  DASHBOARD_EXPLORE_EVENTS: AppRoutes.DASHBOARD + "?page=explore-events",
  DASHBOARD_PROFILE: AppRoutes.DASHBOARD + "?page=profile",
  DASHBOARD_SETTINGS: AppRoutes.DASHBOARD + "?page=settings",
};
export const AppRouteQueryParams = {
  AUTH: "auth",
  USER_SETTINGS: "user-settings",
  PAGE: "page",
};
export const AppRouteQueryValues = {
  LOGIN: "login",
  REGISTER: "register",
  PREFERENCES: "preferences",
  EXPLORE_EVENTS: "explore-events",
  PROFILE: "profile",
  DETAILS: "details",
  SETTINGS: "settings",
  ADMIN: "admin",
};
