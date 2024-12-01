import { relations } from "drizzle-orm";
import { sessions } from "./tables/sessions";
import { users, accounts } from "./tables/users";
import { hackathons, registrations } from "./tables/hackathons";
import { teamMembers, teams } from "./tables/teams";
import { projects } from "./tables/projects";

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  registrations: many(registrations),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

// Defining relations for `hackathons`
export const hackathonsRelations = relations(hackathons, ({ many }) => ({
  teams: many(teams),
  registrations: many(registrations),
  projects: many(projects),
}));

// Defining relations for `teams`
export const teamsRelations = relations(teams, ({ many, one }) => ({
  hackathon: one(hackathons, {
    fields: [teams.hackathonId],
    references: [hackathons.id],
  }),
  members: many(teamMembers),
  projects: many(projects),
}));

// Defining relations for `teamMembers`
export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, { fields: [teamMembers.teamId], references: [teams.id] }),
  user: one(users, { fields: [teamMembers.userId], references: [users.id] }),
}));

// Defining relations for `registrations`
export const registrationsRelations = relations(registrations, ({ one }) => ({
  user: one(users, { fields: [registrations.userId], references: [users.id] }),
  hackathon: one(hackathons, {
    fields: [registrations.hackathonId],
    references: [hackathons.id],
  }),
}));

// Defining relations for `projects`
export const projectsRelations = relations(projects, ({ one }) => ({
  team: one(teams, { fields: [projects.teamId], references: [teams.id] }),
  hackathon: one(hackathons, {
    fields: [projects.hackathonId],
    references: [hackathons.id],
  }),
}));
