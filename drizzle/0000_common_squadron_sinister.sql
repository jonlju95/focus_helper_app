CREATE TABLE `activities` (
	`id` text PRIMARY KEY DEFAULT '8eca7912-c3e6-4a38-8cc6-47d4e7429ead' NOT NULL,
	`title` text NOT NULL,
	`date` text NOT NULL,
	`time` text,
	`prioritized` integer DEFAULT false,
	`description` text,
	`category_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `budget_settings` (
	`id` text PRIMARY KEY DEFAULT '0eb8b1a9-89ba-4255-a009-fe1e8092c31b' NOT NULL,
	`monthly_income` real DEFAULT 0 NOT NULL,
	`fixed_expenses` real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY DEFAULT 'abbdff99-e31e-440a-9ec8-f98942b4f893' NOT NULL,
	`name` text NOT NULL,
	`color_bg` text NOT NULL,
	`color_text` text NOT NULL,
	`entity_type` text DEFAULT 'expense' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY DEFAULT '237c326a-09d8-4a9f-be4d-d58eaa14e1f6' NOT NULL,
	`title` text NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`date` text NOT NULL,
	`location` text,
	`description` text,
	`recurring` integer DEFAULT false,
	`category_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `reminders` (
	`id` text PRIMARY KEY DEFAULT '46a60acc-ef68-4c29-b864-3d1c28f95af0' NOT NULL,
	`title` text NOT NULL,
	`date` text NOT NULL,
	`time` text,
	`prioritized` integer DEFAULT false,
	`category_id` text,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY DEFAULT '018111f0-c3cf-4d76-b57c-0707b53f7dcc' NOT NULL,
	`label` text,
	`completed` integer DEFAULT false,
	`sort_order` integer DEFAULT 0,
	`reminder_id` text,
	FOREIGN KEY (`reminder_id`) REFERENCES `reminders`(`id`) ON UPDATE no action ON DELETE cascade
);
