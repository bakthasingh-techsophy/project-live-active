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

export interface Event {
  id: number;
  title: string;
  hosts: string[];
  rating: number;
  scheduledTime: string;
  description: string;
  tags: string[];
  photoUrl: string;
  loading?: boolean;
  updated?: boolean;
  duration: number;
  password: string;
  joinLink: string;
  ended: boolean;
  started: boolean;
  expired: boolean;
}
