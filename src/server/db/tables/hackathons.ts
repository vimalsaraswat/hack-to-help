import { sql } from "drizzle-orm";
import { index, integer, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "~/server/utils/table-creator";
import { users } from "./users";
import {
  HackathonStatus,
  hackathonStatusEnum,
  RegistrationStatus,
  registrationStatusEnum,
} from "../enums";

export const hackathons = createTable(
  "hackathon",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description").notNull(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    organizerId: varchar("organiser_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    status: hackathonStatusEnum("status")
      .default(HackathonStatus.Upcoming)
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (hackathon) => ({
    organisedIdIdx: index("created_id_idx").on(hackathon.organizerId),
    nameIndex: index("name_idx").on(hackathon.name),
  }),
);

export const registrations = createTable(
  "registration",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    hackathonId: integer("hackathon_id")
      .notNull()
      .references(() => hackathons.id),

    status: registrationStatusEnum("status").default(
      RegistrationStatus.Pending,
    ),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },

  (registration) => ({
    userIdIdx: index("registration_user_id_idx").on(registration.userId),
    hackathonIdIdx: index("registration_hackathon_id_idx").on(
      registration.hackathonId,
    ),
  }),
);
