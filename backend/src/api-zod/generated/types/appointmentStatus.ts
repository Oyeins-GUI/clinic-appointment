export type AppointmentStatus =
   (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const AppointmentStatus = {
   confirmed: "confirmed",
   completed: "completed",
   cancelled: "cancelled",
} as const;
