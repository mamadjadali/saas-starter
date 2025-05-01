import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  date,
  boolean,
  time,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const patients = pgTable('patients', {
  id: serial('id').primaryKey(),

  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'set null' }),

  fullName: varchar('full_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  gender: varchar('gender', { length: 10 }),
  dateOfBirth: date('date_of_birth'),

  bloodType: varchar('blood_type', { length: 3 }),
  allergies: text('allergies'),
  medicalHistory: text('medical_history'),

  nationalId: varchar('national_id', { length: 50 }).unique(),

  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),

  patientId: integer('patient_id')
    .notNull()
    .references(() => patients.id, { onDelete: 'cascade' }),

    providerId: integer('provider_id')
    .references(() => providers.id, { onDelete: 'set null' }),
  
  serviceId: integer('service_id')
    .references(() => services.id, { onDelete: 'set null' }), // Optional: "Dental Checkup", etc.

  statusId: integer('status_id').references(() => appointmentStatuses.id), // pending, confirmed, completed, cancelled

  notes: text('notes'),

  scheduledAt: timestamp('scheduled_at').notNull(),
  durationMinutes: integer('duration_minutes').notNull().default(30),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const providers = pgTable('providers', {
  id: serial('id').primaryKey(),

  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'set null' }),

  name: varchar('name', { length: 100 }).notNull(),
  title: varchar('title', { length: 50 }), // Dr., Therapist, etc.
  specialty: varchar('specialty', { length: 100 }),

  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),

  name: varchar('name', { length: 100 }).notNull(), // e.g. "Dental Cleaning"
  description: text('description'),
  durationMinutes: integer('duration_minutes').notNull().default(30),

  price: integer('price'), // cents or lowest currency unit

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const providerServices = pgTable('provider_services', {
  id: serial('id').primaryKey(),

  providerId: integer('provider_id')
    .notNull()
    .references(() => providers.id, { onDelete: 'cascade' }),

  serviceId: integer('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),

  customDuration: integer('custom_duration'),
  customPrice: integer('custom_price'),
});

export const appointmentStatuses = pgTable('appointment_statuses', {
  id: serial('id').primaryKey(),
  status: varchar('status', { length: 20 }).notNull().unique(), // e.g. pending, confirmed
});

export const providerAvailabilities = pgTable('provider_availabilities', {
  id: serial('id').primaryKey(),
  providerId: integer('provider_id').references(() => providers.id, { onDelete: 'cascade' }),
  dayOfWeek: varchar('day_of_week', { length: 10 }), // Mon, Tue, etc.
  startTime: time('start_time'),
  endTime: time('end_time'),
});



export const providersRelations = relations(providers, ({ one, many }) => ({
  user: one(users, {
    fields: [providers.userId],
    references: [users.id],
  }),
  appointments: many(appointments),
}));


export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(patients, {
    fields: [appointments.patientId],
    references: [patients.id],
  }),
  provider: one(users, {
    fields: [appointments.providerId],
    references: [users.id],
  }),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const patientsRelations = relations(patients, ({ one }) => ({
  user: one(users, {
    fields: [patients.userId],
    references: [users.id],
  }),
}));


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};
export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type Provider = typeof providers.$inferSelect;
export type NewProvider = typeof providers.$inferInsert;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export type AppointmentStatus = typeof appointmentStatuses.$inferSelect;
export type NewAppointmentStatus = typeof appointmentStatuses.$inferInsert;

export type ProviderAvailability = typeof providerAvailabilities.$inferSelect;
export type NewProviderAvailability = typeof providerAvailabilities.$inferInsert;



export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}