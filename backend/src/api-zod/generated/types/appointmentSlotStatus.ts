export type AppointmentSlotStatus =
   (typeof AppointmentSlotStatus)[keyof typeof AppointmentSlotStatus];

export const AppointmentSlotStatus = {
   available: "available",
   booked: "booked",
} as const;
