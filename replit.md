# NayaCare Clinic Appointment System

NayaCare helps patients in Lagos find clinic availability, book an appointment, and manage confirmation and reminder details without waiting in a queue.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/clinic-appointments` — patient-facing React + Vite web app at `/`
- `artifacts/api-server/src/routes/clinic.ts` — clinic, doctor, availability, and summary endpoints
- `artifacts/api-server/src/routes/appointments.ts` — booking, confirmation, patient lookup, and reminder endpoints
- `lib/api-spec/openapi.yaml` — API source of truth
- `lib/db/src/schema/clinic.ts` — Drizzle schema for clinic, doctor, slot, and appointment data
- `README.md` — setup instructions and demo walkthrough

## Architecture decisions

- API contracts are defined in OpenAPI and generated into the React client and Zod validation schemas.
- Calendar days use PostgreSQL `date` columns so clinic availability is not shifted by timezone conversion.
- Booking updates the slot and creates the appointment in one transaction to prevent double booking.
- Patient lookup uses the phone number entered during booking for the MVP; no local authentication was added.

## Product

- Patients browse upcoming availability, filter by doctor, book a visit, see a confirmation code, manage reminders, and look up appointments by phone.
- The clinic details view exposes services, opening hours, address, doctors, and contact information.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
