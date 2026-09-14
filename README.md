# NayaCare Clinic Appointment System

NayaCare is a patient-first clinic booking app for Lagos. Patients can see real availability, choose a doctor and time, book a visit without a queue, manage reminder preferences, and find existing appointments with the phone number used at booking.

## MVP features

- Browse available appointment slots by day and doctor
- Book an appointment with patient details and visit reason
- See a confirmation code and visit details after booking
- Turn appointment reminders on or off
- Find appointments by patient phone number
- View clinic address, hours, services, phone number, and doctors
- Responsive patient-facing experience for mobile and desktop
- Persistent PostgreSQL-backed clinic, slot, and appointment data

## Run locally

This repository uses a pnpm workspace with a shared Express API and a React + Vite web app.

```bash
pnpm install
pnpm --filter @workspace/db run push
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/clinic-appointments run dev
```

The managed workflows provide `PORT`, `BASE_PATH`, and the database connection. The web app is served at the root preview path and the API is available under `/api`.

## Validation

```bash
pnpm run typecheck
pnpm --filter @workspace/clinic-appointments run typecheck
pnpm --filter @workspace/api-server run typecheck
```

## Demo walkthrough

1. Open the home page and choose a day.
2. Filter by doctor if needed, then select an available time.
3. Enter a patient name and phone number, optionally add email and visit reason, and leave reminders enabled.
4. Submit the booking and show the confirmation code, doctor, time, and clinic details.
5. Toggle the reminder preference to demonstrate the reminder control.
6. Open “My appointments”, enter the same phone number, and open the saved confirmation.
7. Finish on “Clinic details” to show services, hours, address, and contact information.

## Architecture

- `artifacts/clinic-appointments` — React + Vite patient-facing web application
- `artifacts/api-server` — Express 5 API routes
- `lib/api-spec/openapi.yaml` — source-of-truth API contract
- `lib/api-client-react` — generated React Query client
- `lib/api-zod` — generated request/response validation
- `lib/db/src/schema/clinic.ts` — Drizzle schema for clinics, doctors, slots, and appointments

The API seeds one clinic, three doctors, and six days of appointment slots in the development database when the database is initialized. The booking flow updates the slot and appointment in one database transaction so a slot cannot be booked twice.