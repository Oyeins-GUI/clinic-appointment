import type { AppointmentSlotStatus } from "./appointmentSlotStatus";

export interface AppointmentSlot {
   id: number;
   doctorId: number;
   doctorName: string;
   specialty: string;
   date: Date;
   startTime: string;
   endTime: string;
   status: AppointmentSlotStatus;
}
