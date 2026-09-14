import { createInsertSchema } from "drizzle-zod";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const clinicsTable = pgTable("clinics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  openingHours: text("opening_hours").notNull(),
  services: text("services").array().notNull(),
});

export const doctorsTable = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  initials: text("initials").notNull(),
  experience: text("experience").notNull(),
});

export const appointmentSlotsTable = pgTable(
  "appointment_slots",
  {
    id: serial("id").primaryKey(),
    doctorId: integer("doctor_id")
      .notNull()
      .references(() => doctorsTable.id),
    date: date("date", { mode: "string" }).notNull(),
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),
    status: text("status").notNull().default("available"),
  },
  (table) => ({
    dateDoctorTimeIdx: uniqueIndex("appointment_slots_date_doctor_time_idx").on(
      table.date,
      table.doctorId,
      table.startTime,
    ),
  }),
);

export const appointmentsTable = pgTable(
  "appointments",
  {
    id: serial("id").primaryKey(),
    confirmationCode: text("confirmation_code").notNull().unique(),
    slotId: integer("slot_id")
      .notNull()
      .references(() => appointmentSlotsTable.id),
    patientName: text("patient_name").notNull(),
    patientPhone: text("patient_phone").notNull(),
    patientEmail: text("patient_email"),
    reason: text("reason"),
    doctorId: integer("doctor_id")
      .notNull()
      .references(() => doctorsTable.id),
    date: date("date", { mode: "string" }).notNull(),
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),
    status: text("status").notNull().default("confirmed"),
    reminderEnabled: boolean("reminder_enabled").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
);

export const insertClinicSchema = createInsertSchema(clinicsTable).omit({
  id: true,
});
export const insertDoctorSchema = createInsertSchema(doctorsTable).omit({
  id: true,
});
export const insertAppointmentSlotSchema = createInsertSchema(
  appointmentSlotsTable,
).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(
  appointmentsTable,
).omit({ id: true, createdAt: true });

export type Clinic = typeof clinicsTable.$inferSelect;
export type Doctor = typeof doctorsTable.$inferSelect;
export type AppointmentSlot = typeof appointmentSlotsTable.$inferSelect;
export type Appointment = typeof appointmentsTable.$inferSelect;
export type InsertClinic = z.infer<typeof insertClinicSchema>;
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type InsertAppointmentSlot = z.infer<typeof insertAppointmentSlotSchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;