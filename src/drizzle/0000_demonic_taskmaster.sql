CREATE TABLE IF NOT EXISTS `reminder_types`
(
    `id`   text PRIMARY KEY NOT NULL,
    `name` text             NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `categories`
(
    `id`          text PRIMARY KEY       NOT NULL,
    `name`        text                   NOT NULL,
    `color_bg`    text                   NOT NULL,
    `color_text`  text                   NOT NULL,
    `entity_type` text DEFAULT 'EXPENSE' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `activities`
(
    `id`          text PRIMARY KEY NOT NULL,
    `title`       text             NOT NULL,
    `date`        text             NOT NULL,
    `time`        text,
    `prioritized` integer DEFAULT false,
    `description` text,
    `category_id` text,
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `budget_settings`
(
    `id`             text PRIMARY KEY NOT NULL,
    `monthly_income` real DEFAULT 0   NOT NULL,
    `fixed_expenses` real DEFAULT 0   NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `expenses`
(
    `id`          text PRIMARY KEY  NOT NULL,
    `title`       text              NOT NULL,
    `amount`      real    DEFAULT 0 NOT NULL,
    `date`        text              NOT NULL,
    `location`    text,
    `description` text,
    `recurring`   integer DEFAULT false,
    `category_id` text,
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `reminders`
(
    `id`          text PRIMARY KEY      NOT NULL,
    `title`       text                  NOT NULL,
    `date`        text                  NOT NULL,
    `time`        text,
    `prioritized` integer DEFAULT false NOT NULL,
    `type_id`     text,
    FOREIGN KEY (`type_id`) REFERENCES `reminder_types` (`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `tasks`
(
    `id`          text PRIMARY KEY      NOT NULL,
    `label`       text                  NOT NULL,
    `completed`   integer DEFAULT false NOT NULL,
    `sort_order`  integer DEFAULT 0,
    `reminder_id` text,
    FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`id`) ON UPDATE no action ON DELETE cascade
);
