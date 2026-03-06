CREATE TABLE `greetings`
(
    `id`     text PRIMARY KEY NOT NULL,
    `phrase` text             NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reminder_types`
(
    `id`   text PRIMARY KEY NOT NULL,
    `name` text             NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_settings`
(
    `key`   text PRIMARY KEY NOT NULL,
    `value` text             NOT NULL
);
--> statement-breakpoint
CREATE TABLE `activities`
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
CREATE TABLE `categories`
(
    `id`          text PRIMARY KEY          NOT NULL,
    `name`        text                      NOT NULL,
    `color_bg`    text                      NOT NULL,
    `color_text`  text                      NOT NULL,
    `entity_type` text    DEFAULT 'EXPENSE' NOT NULL,
    `is_custom`   integer DEFAULT false     NOT NULL
);
--> statement-breakpoint
CREATE TABLE `expenses`
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
CREATE TABLE `reminders`
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
CREATE TABLE `tasks`
(
    `id`          text PRIMARY KEY      NOT NULL,
    `label`       text                  NOT NULL,
    `completed`   integer DEFAULT false NOT NULL,
    `sort_order`  integer DEFAULT 0,
    `reminder_id` text,
    FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`id`) ON UPDATE no action ON DELETE cascade
);

