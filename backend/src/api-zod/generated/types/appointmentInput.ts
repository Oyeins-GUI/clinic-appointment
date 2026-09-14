export interface AppointmentInput {
   slotId: number;
   patientName: string;
   patientPhone: string;
   patientEmail?: string | null;
   reason?: string | null;
   reminderEnabled?: boolean;
}
