// // src/db/seed.ts
// import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
// import { appointmentSlotsTable } from "../schema";

// const pool = new Pool({
//    connectionString: process.env.DATABASE_URL,
// });

// const db = drizzle({ client: pool });

// async function seed() {
//    console.log("Seeding database...");

//    // Insert mock data
//    await db.insert(appointmentSlotsTable).values([]);

//    console.log("Database seeded successfully!");
//    await pool.end();
// }

// seed().catch((err) => {
//    console.error("Seeding failed:", err);
//    process.exit(1);
// });
