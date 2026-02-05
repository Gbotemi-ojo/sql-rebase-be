CREATE TABLE `contacts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`niche_id` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone_number` varchar(50) NOT NULL,
	`social_link` text NOT NULL,
	`status` enum('pending','replied','ignored','successful') DEFAULT 'pending',
	`notes` text,
	`msg1_image` text,
	`msg1_text` text,
	`msg2_image` text,
	`msg2_text` text,
	`msg3_image` text,
	`msg3_text` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `niches` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `niches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_niche_id_niches_id_fk` FOREIGN KEY (`niche_id`) REFERENCES `niches`(`id`) ON DELETE no action ON UPDATE no action;