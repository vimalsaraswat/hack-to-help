import { sql } from "drizzle-orm";
import { index, integer, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "~/server/utils/table-creator";
import { teams } from "./teams";
import { hackathons } from "./hackathons";
import { ProjectStatus, projectStatusEnum } from "../enums";

export const projects = createTable(
  "project",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description").notNull(),
    githubLink: text("github_link").notNull(),

    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id),
    hackathonId: integer("hackathon_id")
      .notNull()
      .references(() => hackathons.id),

    status: projectStatusEnum("status").default(ProjectStatus.Incomplete),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },

  (project) => ({
    teamIdIdx: index("project_team_id_idx").on(project.teamId),
    hackathonIdIdx: index("project_hackathon_id_idx").on(project.hackathonId),
  }),
);
