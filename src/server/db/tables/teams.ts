import { sql } from "drizzle-orm";
import { index, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "~/server/utils/table-creator";
import { hackathons } from "./hackathons";
import { users } from "./users";
import { TeamStatus, teamStatusEnum } from "../enums";

export const teams = createTable(
  "team",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),

    hackathonId: integer("hackathon_id")
      .notNull()
      .references(() => hackathons.id),

    status: teamStatusEnum("status").default(TeamStatus.Pending),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },

  (team) => ({
    hackathonIdIdx: index("team_hackathon_id_idx").on(team.hackathonId),
  }),
);

export const teamMembers = createTable(
  "team_member",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },

  (teamMember) => ({
    teamIdIdx: index("team_member_team_id_idx").on(teamMember.teamId),
    userIdIdx: index("team_member_user_id_idx").on(teamMember.userId),
  }),
);
