import { pgEnum } from "drizzle-orm/pg-core";
import { enumToPgEnum } from "~/server/utils/enum-to-pgenum";

// Enums for Hackathon Statuses
export enum HackathonStatus {
  Upcoming = "upcoming",
  InProgress = "in_progress",
  Completed = "completed",
  Cancelled = "cancelled",
  Archived = "archived",
}

// Enums for Team Statuses
export enum TeamStatus {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
  Rejected = "rejected",
}

// Enums for Project Statuses
export enum ProjectStatus {
  Submitted = "submitted",
  UnderReview = "under_review",
  Judged = "judged",
  Winner = "winner",
  Incomplete = "incomplete",
}

// Enums for Registration Statuses
export enum RegistrationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Withdrawn = "withdrawn",
}

// Enums for User Roles
export enum UserRole {
  Organizer = "organizer",
  Participant = "participant",
  Judge = "judge",
  Admin = "admin",
}

// Enums for Notification Statuses
export enum NotificationStatus {
  Pending = "pending",
  Sent = "sent",
  Failed = "failed",
  Read = "read",
}

// pgEnums
export const hackathonStatusEnum = pgEnum(
  "hackathon_status",
  enumToPgEnum(HackathonStatus),
);
export const teamStatusEnum = pgEnum("team_status", enumToPgEnum(TeamStatus));
export const projectStatusEnum = pgEnum(
  "project_status",
  enumToPgEnum(ProjectStatus),
);
export const registrationStatusEnum = pgEnum(
  "registration_status",
  enumToPgEnum(RegistrationStatus),
);
export const userRoleEnum = pgEnum("user_role", enumToPgEnum(UserRole));
export const notificationStatusEnum = pgEnum(
  "notification_status",
  enumToPgEnum(NotificationStatus),
);
