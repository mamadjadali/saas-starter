CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(255),
	"phone" varchar(20),
	"gender" varchar(10),
	"date_of_birth" date,
	"blood_type" varchar(3),
	"allergies" text,
	"medical_history" text,
	"national_id" varchar(50),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "patients_national_id_unique" UNIQUE("national_id")
);
--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_stripe_customer_id_unique";--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_stripe_subscription_id_unique";--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "stripe_subscription_id";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "stripe_product_id";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "plan_name";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "subscription_status";