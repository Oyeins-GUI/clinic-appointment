import { and, desc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { Router, type IRouter } from "express";
import {
  CreateAppointmentBody,
  CreateAppointmentResponse,
  GetAppointmentParams,
  GetAppointmentResponse,
  ListPatientAppointmentsQueryParams,
  ListPatientAppointmentsResponse,
  UpdateAppointmentReminderBody,
  UpdateAppointmentReminderParams,
  UpdateAppointmentReminderResponse,
} from "@workspace/api-zod";
import {
  appointmentSlotsTable,
  appointmentsTable,
  db,
  doctorsTable,
} from "@workspace/db";

const router: IRouter = Router();

const appointmentSelect = {
  id: appointmentsTable.id,
  confirmationCode: appointmentsTable.confirmationCode,
  patientName: appointmentsTable.patientName,
  patientPhone: appointmentsTable.patientPhone,
  patientEmail: appointmentsTable.patientEmail,
  reason: appointmentsTable.reason,
  doctorId: appointmentsTable.doctorId,
  doctorName: doctorsTable.name,
  specialty: doctorsTable.specialty,
  date: appointmentsTable.date,
  startTime: appointmentsTable.startTime,
  endTime: appointmentsTable.endTime,
  status: appointmentsTable.status,
  reminderEnabled: appointmentsTable.reminderEnabled,
  createdAt: appointmentsTable.createdAt,
};

const findAppointment = async (id: number) =>
  db
    .select(appointmentSelect)
    .from(appointmentsTable)
    .innerJoin(doctorsTable, eq(appointmentsTable.doctorId, doctorsTable.id))
    .where(eq(appointmentsTable.id, id))
    .limit(1);

router.get("/appointments", async (req, res): Promise<void> => {
  const parsed = ListPatientAppointmentsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const appointments = await db
    .select(appointmentSelect)
    .from(appointmentsTable)
    .innerJoin(doctorsTable, eq(appointmentsTable.doctorId, doctorsTable.id))
    .where(eq(appointmentsTable.patientPhone, parsed.data.phone))
    .orderBy(desc(appointmentsTable.date), desc(appointmentsTable.startTime));

  res.json(ListPatientAppointmentsResponse.parse(appointments));
});

router.post("/appointments", async (req, res): Promise<void> => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const created = await db.transaction(async (tx) => {
    const [slot] = await tx
      .select({
        id: appointmentSlotsTable.id,
        doctorId: appointmentSlotsTable.doctorId,
        date: appointmentSlotsTable.date,
        startTime: appointmentSlotsTable.startTime,
        endTime: appointmentSlotsTable.endTime,
        status: appointmentSlotsTable.status,
      })
      .from(appointmentSlotsTable)
      .where(eq(appointmentSlotsTable.id, parsed.data.slotId))
      .limit(1);

    if (!slot || slot.status !== "available") {
      return null;
    }

    const [doctor] = await tx
      .select()
      .from(doctorsTable)
      .where(eq(doctorsTable.id, slot.doctorId))
      .limit(1);

    if (!doctor) {
      return null;
    }

    const [updatedSlot] = await tx
      .update(appointmentSlotsTable)
      .set({ status: "booked" })
      .where(
        and(
          eq(appointmentSlotsTable.id, slot.id),
          eq(appointmentSlotsTable.status, "available"),
        ),
      )
      .returning({ id: appointmentSlotsTable.id });

    if (!updatedSlot) {
      return null;
    }

    const [appointment] = await tx
      .insert(appointmentsTable)
      .values({
        confirmationCode: `NAYA-${randomUUID().slice(0, 6).toUpperCase()}`,
        slotId: slot.id,
        patientName: parsed.data.patientName,
        patientPhone: parsed.data.patientPhone,
        patientEmail: parsed.data.patientEmail ?? null,
        reason: parsed.data.reason ?? null,
        doctorId: slot.doctorId,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        reminderEnabled: parsed.data.reminderEnabled,
      })
      .returning({ id: appointmentsTable.id });

    return appointment ? findAppointmentInTransaction(tx, appointment.id) : null;
  });

  if (!created) {
    res.status(409).json({ error: "That appointment slot is no longer available." });
    return;
  }

  res.status(201).json(CreateAppointmentResponse.parse(created));
});

router.get("/appointments/:id", async (req, res): Promise<void> => {
  const params = GetAppointmentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [appointment] = await findAppointment(params.data.id);
  if (!appointment) {
    res.status(404).json({ error: "Appointment not found" });
    return;
  }

  res.json(GetAppointmentResponse.parse(appointment));
});

router.patch("/appointments/:id/reminder", async (req, res): Promise<void> => {
  const params = UpdateAppointmentReminderParams.safeParse(req.params);
  const body = UpdateAppointmentReminderBody.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [updated] = await db
    .update(appointmentsTable)
    .set({ reminderEnabled: body.data.reminderEnabled })
    .where(eq(appointmentsTable.id, params.data.id))
    .returning({ id: appointmentsTable.id });

  if (!updated) {
    res.status(404).json({ error: "Appointment not found" });
    return;
  }

  const [appointment] = await findAppointment(params.data.id);
  if (!appointment) {
    res.status(404).json({ error: "Appointment not found" });
    return;
  }

  res.json(UpdateAppointmentReminderResponse.parse(appointment));
});

const findAppointmentInTransaction = async (
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  id: number,
) => {
  const [appointment] = await tx
    .select(appointmentSelect)
    .from(appointmentsTable)
    .innerJoin(doctorsTable, eq(appointmentsTable.doctorId, doctorsTable.id))
    .where(eq(appointmentsTable.id, id))
    .limit(1);
  return appointment;
};

export default router;