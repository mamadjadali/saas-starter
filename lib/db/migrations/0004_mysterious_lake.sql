CREATE TABLE "appointment_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(20) NOT NULL,
	CONSTRAINT "appointment_statuses_status_unique" UNIQUE("status")
);
--> statement-breakpoint
CREATE TABLE "provider_availabilities" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider_id" integer,
	"day_of_week" varchar(10),
	"start_time" time,
	"end_time" time
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "status_id" integer;--> statement-breakpoint
ALTER TABLE "provider_availabilities" ADD CONSTRAINT "provider_availabilities_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_status_id_appointment_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."appointment_statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" DROP COLUMN "status";