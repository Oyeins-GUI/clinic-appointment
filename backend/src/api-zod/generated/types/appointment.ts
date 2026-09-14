import type { AppointmentStatus } from "./appointmentStatus";

export interface Appointment {
   id: number;
   confirmationCode: string;
   patientName: string;
   patientPhone: string;
   patientEmail?: string | null;
   reason?: string | null;
   doctorId: number;
   doctorName: string;
   specialty: string;
   date: Date;
   startTime: string;
   endTime: string;
   status: AppointmentStatus;
   reminderEnabled: boolean;
   createdAt: Date;
}
