import { and, asc, eq, sql } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  GetClinicResponse,
  GetClinicSummaryResponse,
  ListAppointmentSlotsQueryParams,
  ListAppointmentSlotsResponse,
  ListDoctorsResponse,
} from "@workspace/api-zod";
import {
  appointmentSlotsTable,
  appointmentsTable,
  clinicsTable,
  db,
  doctorsTable,
} from "@workspace/db";

const router: IRouter = Router();

const formatDate = (value: Date): string => value.toISOString().slice(0, 10);

router.get("/clinic", async (_req, res): Promise<void> => {
  const [clinic] = await db.select().from(clinicsTable).limit(1);
  if (!clinic) {
    res.status(404).json({ error: "Clinic not found" });
    return;
  }

  res.json(GetClinicResponse.parse(clinic));
});

router.get("/doctors", async (_req, res): Promise<void> => {
  const doctors = await db
    .select()
    .from(doctorsTable)
    .orderBy(asc(doctorsTable.name));

  res.json(ListDoctorsResponse.parse(doctors));
});

router.get("/appointment-slots", async (req, res): Promise<void> => {
  const parsed = ListAppointmentSlotsQueryParams.safeParse({
    date: req.query.date
      ? new Date(String(req.query.date))
      : undefined,
    doctorId: req.query.doctorId,
  });

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const conditions = [];
  if (parsed.data.date) {
    conditions.push(eq(appointmentSlotsTable.date, formatDate(parsed.data.date)));
  }
  if (parsed.data.doctorId) {
    conditions.push(eq(appointmentSlotsTable.doctorId, parsed.data.doctorId));
  }

  const slots = await db
    .select({
      id: appointmentSlotsTable.id,
      doctorId: appointmentSlotsTable.doctorId,
      doctorName: doctorsTable.name,
      specialty: doctorsTable.specialty,
      date: appointmentSlotsTable.date,
      startTime: appointmentSlotsTable.startTime,
      endTime: appointmentSlotsTable.endTime,
      status: sql<"available" | "booked">`CASE WHEN ${appointmentSlotsTable.status} = 'available' THEN 'available' ELSE 'booked' END`,
    })
    .from(appointmentSlotsTable)
    .innerJoin(doctorsTable, eq(appointmentSlotsTable.doctorId, doctorsTable.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(appointmentSlotsTable.date), asc(appointmentSlotsTable.startTime));

  res.json(ListAppointmentSlotsResponse.parse(slots));
});

router.get("/clinic-summary", async (_req, res): Promise<void> => {
  const today = formatDate(new Date());
  const availableSlots = await db
    .select({
      date: appointmentSlotsTable.date,
      status: appointmentSlotsTable.status,
    })
    .from(appointmentSlotsTable)
    .where(eq(appointmentSlotsTable.status, "available"))
    .orderBy(asc(appointmentSlotsTable.date));

  const todayAvailable = availableSlots.filter((slot) => slot.date === today).length;
  const nextAvailableDate = availableSlots[0]?.date ?? today;
  const [doctorCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(doctorsTable);
  const [clinic] = await db.select().from(clinicsTable).limit(1);

  res.json(
    GetClinicSummaryResponse.parse({
      nextAvailableDate,
      availableToday: todayAvailable,
      totalDoctors: Number(doctorCount?.count ?? 0),
      services: clinic?.services ?? [],
    }),
  );
});

export default router;