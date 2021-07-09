import {MigrationInterface, QueryRunner} from "typeorm";

export class initialState1625807404463 implements MigrationInterface {
    name = 'initialState1625807404463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `test_answers` (`id` varchar(36) NOT NULL, `option` varchar(100) NOT NULL, `image` varchar(100) NULL, `is_selected` tinyint NULL DEFAULT 0, `is_valid` tinyint NULL DEFAULT 0, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL, `test_question_id` varchar(36) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `leads` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `surname` varchar(50) NOT NULL, `mother_surname` varchar(50) NOT NULL, `gender` char(1) NULL, `email` varchar(150) NOT NULL, `cellphone` varchar(10) NOT NULL, `document_number` varchar(8) NULL, `birthdate` date NOT NULL, `interest_career_id` varchar(10) NOT NULL, `interest_career_name` varchar(100) NOT NULL, `school_id` varchar(20) NOT NULL, `school_name` varchar(100) NOT NULL, `promoter_id` varchar(20) NOT NULL, `promoter_name` varchar(100) NOT NULL, `hs_code` varchar(10) NOT NULL, `hs_name` varchar(50) NOT NULL, `hs_year_completed` year NOT NULL, `source` varchar(50) NOT NULL, `source_detail` varchar(100) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_b3eea7add0e16594dba102716c` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` bigint NOT NULL AUTO_INCREMENT, `email` varchar(150) NOT NULL, `password` varchar(250) NOT NULL, `email_verified_at` timestamp NULL, `is_active` tinyint NOT NULL DEFAULT 0, `last_login` timestamp NULL, `active_jwt` text NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `lead_id` bigint NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `REL_ac88a74dd297a21674a11c6470` (`lead_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tests` (`id` bigint NOT NULL AUTO_INCREMENT, `start_date` timestamp NULL, `end_date` timestamp NULL, `total_questions` int NOT NULL, `total_correct_questions` int NULL, `is_completed` tinyint NULL DEFAULT 0, `time_over` tinyint NULL DEFAULT 0, `test_minutes` int NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `user_id` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `test_questions` (`id` varchar(36) NOT NULL, `question_code` varchar(20) NOT NULL, `question_description` text NOT NULL, `question_image` varchar(100) NULL, `question_level` varchar(15) NOT NULL, `question_thematic_name` varchar(100) NOT NULL, `is_marked` tinyint NULL, `area_code` varchar(5) NOT NULL, `thematic_name` varchar(100) NOT NULL, `question_start` timestamp NULL, `question_end` timestamp NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NULL, `test_id` bigint NULL, `area_id` smallint NULL, `thematic_id` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `areas` (`id` smallint NOT NULL AUTO_INCREMENT, `code` varchar(5) NOT NULL, `name` varchar(100) NOT NULL, `is_active` tinyint NOT NULL DEFAULT 0, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_8c2ad80240e18fcac9e7c52631` (`name`), UNIQUE INDEX `IDX_1ce4e4f7cd8d820081bc74aa16` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `test_configs` (`id` bigint NOT NULL AUTO_INCREMENT, `code` varchar(20) NOT NULL, `level` varchar(15) NOT NULL, `questions_number` smallint NOT NULL, `is_active` tinyint NOT NULL DEFAULT 0, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `thematic_id` bigint NOT NULL, UNIQUE INDEX `IDX_86a52b5e1e013e8945bc2906ff` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `thematics` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `is_active` tinyint NOT NULL DEFAULT 0, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `area_id` smallint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `questions` (`id` bigint NOT NULL AUTO_INCREMENT, `code` varchar(20) NOT NULL, `description` text NOT NULL, `image` varchar(100) NULL, `is_active` tinyint NOT NULL DEFAULT 0, `level` varchar(15) NOT NULL, `thematic_id` bigint NOT NULL, UNIQUE INDEX `IDX_9eb6109f2b2a7b5514e3392b0f` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `alternatives` (`id` bigint NOT NULL AUTO_INCREMENT, `option` varchar(100) NOT NULL, `image` varchar(100) NULL, `is_valid` tinyint NOT NULL DEFAULT 0, `question_id` bigint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` smallint NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `display_name` varchar(50) NOT NULL, UNIQUE INDEX `IDX_498e566f23124e519c0d40609b` (`display_name`), UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `permission_role` (`id` int NOT NULL AUTO_INCREMENT, `role_id` smallint NOT NULL, `permission_id` int NOT NULL, UNIQUE INDEX `IDX_559155e68c73c7b70d216b3e2e` (`role_id`, `permission_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `permissions` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `display_name` varchar(100) NOT NULL, `module_id` smallint NOT NULL, UNIQUE INDEX `IDX_1868fcc7e7d78014005703c5b7` (`display_name`), UNIQUE INDEX `IDX_48ce552495d14eae9b187bb671` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `modules` (`id` smallint NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, UNIQUE INDEX `IDX_8cd1abde4b70e59644c98668c0` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `settings` (`code` varchar(50) NOT NULL, `value` text NOT NULL, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_9095413701e40a531bc49fc0b8` (`code`), PRIMARY KEY (`code`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `test_answers` ADD CONSTRAINT `FK_526431111ae0d8408c54be792ab` FOREIGN KEY (`test_question_id`) REFERENCES `test_questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_ac88a74dd297a21674a11c64704` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tests` ADD CONSTRAINT `FK_a6ea3eda960a372cd7b3b18ca71` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `test_questions` ADD CONSTRAINT `FK_5badfac5ec550e555213ad2e5bc` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `test_questions` ADD CONSTRAINT `FK_5c1a739a6e107b5cecd40153251` FOREIGN KEY (`area_id`) REFERENCES `areas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `test_questions` ADD CONSTRAINT `FK_33425a39d01e08c009fdb1653c1` FOREIGN KEY (`thematic_id`) REFERENCES `thematics`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `test_configs` ADD CONSTRAINT `FK_02b3c7b69281aa38dbde405b4ee` FOREIGN KEY (`thematic_id`) REFERENCES `thematics`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `thematics` ADD CONSTRAINT `FK_0f21bc4c0e727f68f37ce248eff` FOREIGN KEY (`area_id`) REFERENCES `areas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_3cceb1979107fdce6d687ba827c` FOREIGN KEY (`thematic_id`) REFERENCES `thematics`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `alternatives` ADD CONSTRAINT `FK_789e57f8c7f53c0a425393deec5` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `permission_role` ADD CONSTRAINT `FK_693f65986d1bd7b5bc973e30d76` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `permission_role` ADD CONSTRAINT `FK_ea144050277434b1ec4a3070614` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `permissions` ADD CONSTRAINT `FK_738f46bb9ac6ea356f1915835d0` FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `permissions` DROP FOREIGN KEY `FK_738f46bb9ac6ea356f1915835d0`");
        await queryRunner.query("ALTER TABLE `permission_role` DROP FOREIGN KEY `FK_ea144050277434b1ec4a3070614`");
        await queryRunner.query("ALTER TABLE `permission_role` DROP FOREIGN KEY `FK_693f65986d1bd7b5bc973e30d76`");
        await queryRunner.query("ALTER TABLE `alternatives` DROP FOREIGN KEY `FK_789e57f8c7f53c0a425393deec5`");
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_3cceb1979107fdce6d687ba827c`");
        await queryRunner.query("ALTER TABLE `thematics` DROP FOREIGN KEY `FK_0f21bc4c0e727f68f37ce248eff`");
        await queryRunner.query("ALTER TABLE `test_configs` DROP FOREIGN KEY `FK_02b3c7b69281aa38dbde405b4ee`");
        await queryRunner.query("ALTER TABLE `test_questions` DROP FOREIGN KEY `FK_33425a39d01e08c009fdb1653c1`");
        await queryRunner.query("ALTER TABLE `test_questions` DROP FOREIGN KEY `FK_5c1a739a6e107b5cecd40153251`");
        await queryRunner.query("ALTER TABLE `test_questions` DROP FOREIGN KEY `FK_5badfac5ec550e555213ad2e5bc`");
        await queryRunner.query("ALTER TABLE `tests` DROP FOREIGN KEY `FK_a6ea3eda960a372cd7b3b18ca71`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_ac88a74dd297a21674a11c64704`");
        await queryRunner.query("ALTER TABLE `test_answers` DROP FOREIGN KEY `FK_526431111ae0d8408c54be792ab`");
        await queryRunner.query("DROP INDEX `IDX_9095413701e40a531bc49fc0b8` ON `settings`");
        await queryRunner.query("DROP TABLE `settings`");
        await queryRunner.query("DROP INDEX `IDX_8cd1abde4b70e59644c98668c0` ON `modules`");
        await queryRunner.query("DROP TABLE `modules`");
        await queryRunner.query("DROP INDEX `IDX_48ce552495d14eae9b187bb671` ON `permissions`");
        await queryRunner.query("DROP INDEX `IDX_1868fcc7e7d78014005703c5b7` ON `permissions`");
        await queryRunner.query("DROP TABLE `permissions`");
        await queryRunner.query("DROP INDEX `IDX_559155e68c73c7b70d216b3e2e` ON `permission_role`");
        await queryRunner.query("DROP TABLE `permission_role`");
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `roles`");
        await queryRunner.query("DROP INDEX `IDX_498e566f23124e519c0d40609b` ON `roles`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP TABLE `alternatives`");
        await queryRunner.query("DROP INDEX `IDX_9eb6109f2b2a7b5514e3392b0f` ON `questions`");
        await queryRunner.query("DROP TABLE `questions`");
        await queryRunner.query("DROP TABLE `thematics`");
        await queryRunner.query("DROP INDEX `IDX_86a52b5e1e013e8945bc2906ff` ON `test_configs`");
        await queryRunner.query("DROP TABLE `test_configs`");
        await queryRunner.query("DROP INDEX `IDX_1ce4e4f7cd8d820081bc74aa16` ON `areas`");
        await queryRunner.query("DROP INDEX `IDX_8c2ad80240e18fcac9e7c52631` ON `areas`");
        await queryRunner.query("DROP TABLE `areas`");
        await queryRunner.query("DROP TABLE `test_questions`");
        await queryRunner.query("DROP TABLE `tests`");
        await queryRunner.query("DROP INDEX `REL_ac88a74dd297a21674a11c6470` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_b3eea7add0e16594dba102716c` ON `leads`");
        await queryRunner.query("DROP TABLE `leads`");
        await queryRunner.query("DROP TABLE `test_answers`");
    }

}
