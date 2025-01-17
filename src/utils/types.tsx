export type NotificationType = "error" | "info" | "success" | "warning";

export const NotificationTypes = {
  ERROR: "error" as NotificationType,
  INFO: "info" as NotificationType,
  SUCCESS: "success" as NotificationType,
  WARNING: "warning" as NotificationType,
} as const;

export interface BlobResponseProps {
  success: boolean;
  data?: Blob;
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}
